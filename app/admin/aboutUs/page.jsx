'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminAboutSection() {
  const [sections, setSections] = useState([]);
  const [savingIndex, setSavingIndex] = useState(null);
  const [message, setMessage] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    fetch('/api/about-sections')
      .then((res) => res.json())
      .then((data) => setSections(data.sections))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (index) => {
    const sec = sections[index];
    const method = sec._id ? 'PATCH' : 'POST';

    const body = {
      id: sec._id,
      title: sec.title,
      content: sec.content,
      imageUrl: sec.imageUrl, // ✅ Отправляем один объект imageUrl
      cta: sec.cta,
      order: index + 1,
    };

    try {
      setSavingIndex(index);
      const res = await fetch('/api/about-sections', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      if (!sec._id && data._id) {
        setSections((prev) =>
          prev.map((s, i) => (i === index ? { ...s, _id: data._id } : s))
        );
      }

      setMessage({ type: 'success', text: 'Секция сохранена!' });
    } catch {
      setMessage({ type: 'error', text: 'Ошибка при сохранении секции.' });
    } finally {
      setSavingIndex(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (index, key, value) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const handleImageUpload = async (index, files) => {
    const formData = new FormData();
    if (files.length > 0) {
      formData.append('file', files[0]);
    } else {
      console.warn('Нет выбранных файлов для загрузки.');
      return;
    }

    try {
      const res = await fetch(`/api/uploadAboutImage?id=${sections[index]._id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data?.imageUrl) {
        // ✅ Обновляем state с одним объектом imageUrl
        setSections((prev) =>
          prev.map((s, i) => (i === index ? { ...s, imageUrl: data.imageUrl } : s))
        );
      } else if (data?.error) {
        console.error('Ошибка загрузки изображения:', data.error);
      }
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setSections(items);

    await fetch('/api/reorderAbout', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: items.map((s) => s._id) }),
    });
  };

  const handleSectionDelete = async (id) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту секцию?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/about-sections?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSections((prev) => prev.filter((s) => s._id !== id));
      } else {
        console.error('Ошибка удаления секции');
      }
    } catch (err) {
      console.error('Ошибка запроса:', err);
    }
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { title: '', content: '', imageUrl: null, cta: '', order: prev.length + 1 }, // ✅ imageUrl инициализируем как null
    ]);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Редактировать секции "Über uns"</h1>

      {message && (
        <div
          className={`p-3 rounded text-white ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {message.text}
        </div>
      )}

      <button onClick={addSection} className="bg-blue-600 text-white px-4 py-2 rounded">
        Добавить секцию
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="aboutSections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((sec, i) => (
                <Draggable draggableId={sec._id || `new-${i}`} index={i} key={sec._id || `new-${i}`}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-4 rounded space-y-4 mt-4 bg-white shadow"
                    >
                      <input
                        type="text"
                        value={sec.title}
                        onChange={(e) => handleChange(i, 'title', e.target.value)}
                        placeholder="Заголовок"
                        className="w-full p-2 border rounded"
                      />
                      <textarea
                        rows={5}
                        value={sec.content}
                        onChange={(e) => handleChange(i, 'content', e.target.value)}
                        placeholder="Содержание"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(i, e.target.files)}
                      />
                      {sec.imageUrl?.url && ( // ✅ Отображаем imageUrl.url
                        <div className="grid grid-cols-1 gap-2">
                          <img key={0} src={sec.imageUrl.url} className="rounded shadow max-h-32 object-cover" />
                        </div>
                      )}
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => handleSectionDelete(sec._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Удалить секцию
                        </button>
                        <button
                          onClick={() => handleSave(i)}
                          disabled={savingIndex === i}
                          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                          {savingIndex === i ? '💾 Сохранение...' : '💾 Сохранить'}
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}