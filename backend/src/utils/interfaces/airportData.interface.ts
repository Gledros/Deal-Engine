import { Schema, model, connect, Model } from 'mongoose';
import { IWeatherForecast } from './weatherForecast.interface';

export interface IAirportData {
  IATA_code: string;
  latitude: number;
  longitude: number;
  weatherForecast?: IWeatherForecast;
}

export const airportSchema = new Schema<IAirportData>({
  IATA_code: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  weatherForecast: { type: {}, required: false }
});

export const Airport = model<IAirportData>('Airport', airportSchema);
