import request from 'supertest';
import handler from '../../pages/api/upload';
import http from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';

const createServer = (req: NextApiRequest, res: NextApiResponse) => {
  return http.createServer((req, res) => handler(req, res));
};

describe('POST /api/upload', () => {
  it('should upload a file successfully', async () => {
    const server = createServer();
    const form = new FormData();
    form.append('file', 'test-file-content');
    const response = await request(server)
      .post('/api/upload')
      .set('Content-Type', 'multipart/form-data')
      .send(form);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url');
  });

  it('should return 405 for GET method', async () => {
    const server = createServer();
    const response = await request(server).get('/api/upload');

    expect(response.status).toBe(405);
  });
});
