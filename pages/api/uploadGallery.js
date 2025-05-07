import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dbConnect from '../../utils/dbConnect';
import GalleryImage from '../../models/GalleryImage';

const uploadDir = './public/uploads/gallery';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const name = `gallery-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(err, req, res) {
    res.status(501).json({ error: `Ошибка загрузки: ${err.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  await dbConnect();
  const fileUrl = `/uploads/gallery/${req.file.filename}`;
  const image = await GalleryImage.create({ url: fileUrl });
  res.status(200).json(image);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};