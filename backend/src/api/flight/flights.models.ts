import { Schema, model } from 'mongoose';
import { IFlightData } from '../../utils/interfaces';

export const flightDataSchema = new Schema<IFlightData>({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  airline: { type: String, required: true },
  flight_num: { type: Number, required: true },
  origin_iata_code: { type: String, required: true },
  origin_name: { type: String, required: true },
  origin_latitude: { type: Number, required: true },
  origin_longitude: { type: Number, required: true },
  destination_iata_code: { type: String, required: true },
  destination_name: { type: String, required: true },
  destination_latitude: { type: Number, required: true },
  destination_longitude: { type: Number, required: true }
});

const Flight = model<IFlightData>('Flight', flightDataSchema);

export const getAllFlights = async (): Promise<IFlightData[]> => {
  return await Flight.find().exec();
};

export const getFlightsByOrigin = async (
  IATA_code: string
): Promise<IFlightData[] | []> => {
  return await Flight.find({ origin_iata_code: IATA_code }).exec();
};

export const getFlightsByDestination = async (
  IATA_code: string
): Promise<IFlightData[] | []> => {
  return await Flight.find({ destination_iata_code: IATA_code }).exec();
};

export const getFlightsByAirline = async (
  airline: string
): Promise<IFlightData[] | []> => {
  return await Flight.find({ airline: airline }).exec();
};

export const createFlight = async (data: IFlightData): Promise<IFlightData | null> => {
  const newFlight = new Flight(data);
  return await newFlight.save();
};
