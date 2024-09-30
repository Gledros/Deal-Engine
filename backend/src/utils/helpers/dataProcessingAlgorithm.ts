import * as fs from 'fs';
import { parse } from 'csv-parse';
import { airportDataType, flightDataType } from '../types';

const fileName = 'test-data';
const filePath = `src/${fileName}.csv`;

let data: flightDataType[] = [];
let airports: airportDataType[] = [];

const processAirport = (flightData: flightDataType) => {
  const airportOriginData: airportDataType = {
    IATA_code: flightData.origin_iata_code,
    latitude: flightData.origin_latitude,
    longitude: flightData.origin_longitude
  };

  let airport = airports.find(
    ({ IATA_code }) => IATA_code === flightData.origin_iata_code
  );

  if (!airport) airports.push(airportOriginData);

  const airportDestinationData: airportDataType = {
    IATA_code: flightData.destination_iata_code,
    latitude: flightData.destination_latitude,
    longitude: flightData.destination_longitude
  };

  airport = airports.find(
    ({ IATA_code }) => IATA_code === flightData.destination_iata_code
  );

  if (!airport) airports.push(airportDestinationData);
};

export const processData = () => {
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      const flightData: flightDataType = {
        origin: row[0],
        destination: row[1],
        airline: row[2],
        flight_num: Number(row[3]),
        origin_iata_code: row[4],
        origin_name: row[5],
        origin_latitude: Number(row[6]),
        origin_longitude: Number(row[7]),
        destination_iata_code: row[8],
        destination_name: row[9],
        destination_latitude: Number(row[10]),
        destination_longitude: Number(row[11])
      };

      processAirport(flightData);

      data.push(flightData);
    })
    .on('end', function () {
      console.log('finished');
      console.log(data[0]);
      // console.log(data.length);
      console.log(airports);
      // console.log(airports.length);
    })
    .on('error', (error) => {
      console.log(error.message);
    });
};
