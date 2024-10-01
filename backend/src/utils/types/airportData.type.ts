import { weatherForecastType } from './weatherForecast.type';

export type airportDataType = {
  IATA_code: string;
  latitude: number;
  longitude: number;
  weatherForecast: weatherForecastType | undefined;
};
