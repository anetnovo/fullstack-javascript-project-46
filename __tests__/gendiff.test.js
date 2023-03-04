import gendiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

test('gendiff', () => {
  var  __filename = fileURLToPath(import.meta.url);
console.log(__filename)
  let  __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  expect(gendiff(JSON.parse(readFile(test_file1.json)), JSON.parse(readFile(test_file2.json)))).toEqual(JSON.parse(readFile(expected_json.txt)));
});
