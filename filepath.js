
import { fileURLToPath } from 'url';   
 import { dirname } from 'path';   
  var  __filename = fileURLToPath(import.meta.url);
console.log(__filename)
let  __dirname = dirname(__filename);  
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); 
 const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8'); 
