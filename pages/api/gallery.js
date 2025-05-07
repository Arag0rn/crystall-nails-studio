import dbConnect from '../../utils/dbConnect';
import GalleryImage from '@/models/GalleryImage';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    return res.status(200).json(images);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const image = await GalleryImage.findById(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // удаляем файл с диска
    const imagePath = path.join(process.cwd(), 'public', image.url);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await image.deleteOne();
    return res.status(200).json({ message: 'Удалено' });
  }

  res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
}