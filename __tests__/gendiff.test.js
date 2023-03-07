import gendiff from '../src/index.js';
import * as url from 'url';
import path from 'node:path';
import fs from 'fs';

test('gendiff', () => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = new URL(".", import.meta.url).pathname;

  const getFixturePath = (filename) => {
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = new URL(".", import.meta.url).pathname;
    return  path.join(__dirname, '..', '__tests__/__fixtures__', filename);
  };

  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const file1 = readFile('test_file1.json');
  const file2 = readFile('test_file2.json');
  const expectedJSON = readFile('expected_json.txt');
  expect(gendiff(JSON.parse(file1), JSON.parse(file2))).toEqual(JSON.parse(expectedJSON));
});

