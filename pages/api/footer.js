
import Footer from '../../models/footer'
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.status(200).json({ footer });
  }

  else if (req.method === 'PUT') {
    const body = req.body;
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(body);
    } else {
      await Footer.updateOne({}, body);
    }
    res.status(200).json({ success: true });
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
