import { IWeatherForecast } from './weatherForecast.interface';

export interface IAirportData {
  IATA_code: string;
  latitude: number;
  longitude: number;
  weatherForecast?: IWeatherForecast;
}
