import gendiff from '../src/index.js';
import * as url from 'url';
import { path } from 'path';

test('gendiff', () => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
 //  let  __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  expect(gendiff(JSON.parse(readFile(test_file1.json)), JSON.parse(readFile(test_file2.json)))).toEqual(JSON.parse(readFile(expected_json.txt)));
});
