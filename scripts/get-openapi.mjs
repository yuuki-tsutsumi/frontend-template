import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = resolve(__dirname, '../openapi.json');
const url = 'http://localhost:8000/openapi.json';

http
  .get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Failed to fetch openapi.json: Status ${res.statusCode}`);
      res.resume();
      return;
    }

    const file = fs.createWriteStream(outputPath);
    res.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('openapi.json successfully downloaded to project root.');
    });
  })
  .on('error', (err) => {
    console.error(`Error fetching openapi.json: ${err.message}`);
  });
