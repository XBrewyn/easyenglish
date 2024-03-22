import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const BUILD_PATH: string = './build';
const { PORT = 3000 } = process.env;

app.use((_req: Request, res: Response, next: any): void => {
  res.setHeader('Content-Security-Policy', "img-src 'self' data: *");
  next();
});

app.use(express.static(path.join(__dirname, BUILD_PATH)));

// Server React SPA
app.get('*', (_req: Request, res: Response): void => {
  res.sendFile(path.resolve(__dirname, BUILD_PATH, 'index.html'));
});

// Start Server
app.listen(PORT, (): void => {
  console.log('Server is running on port', PORT);
});
