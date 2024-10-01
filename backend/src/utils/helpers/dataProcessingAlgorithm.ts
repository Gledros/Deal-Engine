import * as fs from 'fs';
import { parse } from 'csv-parse';
import { IAirportData, IFlightData } from '../interfaces';
import weatherAPI from './weatherAPI.class';
import { emitter } from './eventEmitter.class';
import { createFlight } from '../../api/flight';

const fileName = 'test-data';
const filePath = `src/${fileName}.csv`;
const eventEmitter = new emitter();

let airports: IAirportData[] = [];

const processAirport = (flightData: IFlightData) => {
  const airportOriginData: IAirportData = {
    IATA_code: flightData.origin_iata_code,
    latitude: flightData.origin_latitude,
    longitude: flightData.origin_longitude,
    weatherForecast: undefined
  };

  let airport = airports.find(
    ({ IATA_code }) => IATA_code === flightData.origin_iata_code
  );

  if (!airport) {
    airports.push(airportOriginData);
    eventEmitter.emit('newAirport', airportOriginData);
  }

  const airportDestinationData: IAirportData = {
    IATA_code: flightData.destination_iata_code,
    latitude: flightData.destination_latitude,
    longitude: flightData.destination_longitude,
    weatherForecast: undefined
  };

  airport = airports.find(
    ({ IATA_code }) => IATA_code === flightData.destination_iata_code
  );

  if (!airport) {
    airports.push(airportDestinationData);
    eventEmitter.emit('newAirport', airportDestinationData);
  }
};

export const processData = async () => {
  weatherAPI.startRequestingData(eventEmitter);

  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      const flightData: IFlightData = {
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

      createFlight(flightData);
    })
    .on('end', function () {
      console.log('finished processing csv data');
      eventEmitter.removeAllListeners();
    })
    .on('error', (error) => {
      console.log(error.message);
    });
};
