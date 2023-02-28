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
  const json = JSON.stringify(tmp, null, 2);
  return json.replace(/\[|\]/gm, function replace(el) {
    if (el === ']') return '}';
    return '{';
  });
};

export default (filePath1, filePath2) => {
  const getData = (filePath) => {
    const data = fs.readFileSync(path.join(process.cwd(), '__fixtures__', filePath), 'utf-8');
    return JSON.parse(data);
  };

  const firstObj = getData(filePath1);
  const secondObj = getData(filePath2);
  return genDiff(firstObj, secondObj);
};
