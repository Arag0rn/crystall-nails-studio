import mongoose from 'mongoose';

const aboutSectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrls: [String],
  cta: String,
  order: Number,
});

export default mongoose.models.AboutSection || mongoose.model('AboutSection', aboutSectionSchema);
