'use client';

import { useEffect, useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function AdminAboutSection() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/about-sections')
      .then((res) => res.json())
      .then((data) => setSections(data.sections));
  }, []);

  const handleSave = async (index) => {
    const sec = sections[index];
    const method = sec._id ? 'PUT' : 'POST';
    await fetch('/api/about-sections', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sec),
    });
  };

  const handleChange = (index, key, value) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const handleImageUpload = async (index, files) => {
    const formData = new FormData();
    for (let file of files) formData.append('files', file);

    const res = await fetch(`/api/uploadAboutImage?id=${sections[index]._id}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.urls) {
      setSections((prev) =>
        prev.map((s, i) => (i === index ? { ...s, imageUrls: [...(s.imageUrls || []), ...data.urls] } : s))
      );
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
    setSections((prev) => [...prev, { title: '', content: '', imageUrls: [], cta: '', order: prev.length + 1 }]);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Редактировать секции "Über uns"</h1>

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
                      className="border p-4 rounded space-y-4 mt-4"
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
                        multiple
                        onChange={(e) => handleImageUpload(i, e.target.files)}
                      />
                      {sec.imageUrls?.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {sec.imageUrls.map((url, idx) => (
                            <img key={idx} src={url} className="rounded shadow max-h-32 object-cover" />
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => handleSectionDelete(sec._id)}
                        className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                        Удалить секцию
                        </button>
                      <button
                        onClick={() => handleSave(i)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        💾Сохранить
                      </button>
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
