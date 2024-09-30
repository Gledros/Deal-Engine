import * as fs from 'fs';
import { parse } from 'csv-parse';
import { flightDataType } from '../types';

const fileName = 'test-data';
const filePath = `src/${fileName}.csv`;

let data: flightDataType[] = [];

export const processData = () => {
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row: flightDataType) => {
      data.push(row);
    })
    .on('end', function () {
      console.log('finished');
      console.log(data[0]);
    })
    .on('error', (error) => {
      console.log(error.message);
    });
};
