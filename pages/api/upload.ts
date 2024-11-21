import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from '../../services/cloudinaryService';
import multer from 'multer';

interface CustomNextApiRequest extends NextApiRequest {
  file?: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    size: number;
  };
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.single('file')(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to process file upload' });
      }

      try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await uploadFile(file.buffer);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ error: 'Failed to upload file' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
