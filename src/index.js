import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import process from 'process';

const genDiff = (firstObject, secondObject) => {
  const keysOne = Object.keys(firstObject);
  const keysTwo = Object.keys(secondObject);
  const allKeys = _.union(keysOne, keysTwo).sort();
  const getDiff = allKeys.map((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        return `  ${key}: ${firstObject[key]}`;
      }
      return [`- ${key}: ${firstObject[key]}`, `+ ${key}: ${secondObject[key]}`];
    }
    if (!Object.hasOwn(firstObject, key)) {
      return `+ ${key}: ${secondObject[key]}`;
    }
    if (!Object.hasOwn(secondObject, key)) {
      return `- ${key}: ${firstObject[key]}`;
    }
  });
  const tmp = getDiff.flat();
  return `{\n ${tmp.join('\n ')}\n}`;
};

const getData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
//  console.log( typeof filePath)
//  const absolutePath = path.join(process.cwd(), '__fixtures__', filePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
 };

export default (filePath1, filePath2) => {
   // const data = fs.readFileSync(path.join(process.cwd(), '__fixtures__', filePath), 'utf-8');
   // const data = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8');
//   console.log(typeof process.cwd())
  const firstObj = getData(filePath1);
  const secondObj = getData(filePath2);
  return genDiff(firstObj, secondObj);
};
