import { Schema, model } from 'mongoose';
import { IAirportData } from '../../utils/interfaces';

export const airportSchema = new Schema<IAirportData>({
  IATA_code: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  weatherForecast: { type: {}, required: false }
});

const Airport = model<IAirportData>('Airport', airportSchema);

export const getAllAirports = async (): Promise<IAirportData[]> => {
  return await Airport.find().exec();
};

export const getAirportByIATA_code = async (
  IATA_code: string
): Promise<IAirportData | null> => {
  return await Airport.findOne({ IATA_code: IATA_code }).exec();
};

export const createAirport = async (data: IAirportData): Promise<IAirportData | null> => {
  const newAirport = new Airport(data);
  return await newAirport.save();
};

export const deleteAllAirports = (): void => {
  Airport.deleteMany();
};
