import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dbConnect from '../../utils/dbConnect';
import AboutSection from '@/models/aboutSection';

const uploadDir = './public/uploads/about';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const sectionId = req.query.id || Date.now();
    cb(null, `about-${sectionId}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect();

apiRoute.use(upload.array('files'));

apiRoute.post(async (req, res) => {
  await dbConnect(); // <- подключаемся к MongoDB

  const urls = req.files.map(file => `/uploads/about/${file.filename}`);
  const sectionId = req.query.id;

  if (!sectionId) {
    return res.status(400).json({ error: 'Отсутствует ID секции' });
  }

  try {
    await AboutSection.findByIdAndUpdate(sectionId, {
      $push: { imageUrls: { $each: urls } },
    });

    res.status(200).json({ urls });
  } catch (err) {
    console.error('Ошибка при обновлении секции:', err);
    res.status(500).json({ error: 'Не удалось сохранить изображения' });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
