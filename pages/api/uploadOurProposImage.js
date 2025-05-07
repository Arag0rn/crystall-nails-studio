import { default as nextConnect } from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Папка для изображений OurPropos
const uploadDir = './public/uploads/ourPropos';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    // получаем индекс секции из query, если есть, иначе дата
    const sectionId = req.query.id
    cb(null, `section-${sectionId}.jpg`);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Ошибка загрузки: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const sectionId = req.query.id;
  const imageUrl = `/uploads/ourPropos/section-${sectionId}.jpg`;

  res.status(200).json({ url: imageUrl });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
