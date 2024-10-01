import { createAirport, getAirportByIATA_code } from '../../api/airport';
import { IAirportData, IWeatherForecast } from '../interfaces';
import { emitter } from './eventEmitter.class';
import { fetchWeatherApi } from 'openmeteo';

class weatherAPI {
  static #instance: weatherAPI;

  private static maxConnections: number = 10;
  private currentConnections: number = 0;
  private airports: IAirportData[] = [];

  // Weather interpretation codes defined by the WMO
  private wmoCodes: Map<number, string> = new Map([
    [0, 'Clear sky'],
    [1, 'Mainly clear'],
    [2, 'Partly cloudy'],
    [3, 'Overcast'],
    [45, 'Fog'],
    [48, 'Depositing rime fog'],
    [51, 'Light intensity drizzle'],
    [53, 'Moderate intensity drizzle'],
    [55, 'Dense intensity drizzle'],
    [56, 'Freezing light intensity drizzle'],
    [57, 'Freezing dense intensity drizzle'],
    [61, 'Slight intensity rain'],
    [63, 'Moderate intensity rain'],
    [65, 'Heavy intensity rain'],
    [66, 'Freezing slight intensity rain'],
    [67, 'Freezing heavy intensity rain'],
    [71, 'Slight intensity snow fall'],
    [73, 'Moderate intensity snow fall'],
    [75, 'Heavy intensity snow fall'],
    [77, 'Snow grains'],
    [80, 'Slight intensity rain showers'],
    [81, 'Moderate intensity rain showers'],
    [82, 'Violent intensity rain showers'],
    [85, 'Light intensity snow showers'],
    [86, 'Heavy intensity snow showers'],
    [95, 'Slight or moderate intensity thunderstorm'],
    [96, 'Slight hail thunderstorm'],
    [99, 'Heavy hail thunderstorm']
  ]);

  private constructor() {}

  public static get instance(): weatherAPI {
    if (!weatherAPI.#instance) weatherAPI.#instance = new weatherAPI();

    return weatherAPI.#instance;
  }

  public startRequestingData = async (eventEmitter: emitter) => {
    eventEmitter.on('newAirport', async (airportData: IAirportData) => {
      const query = await getAirportByIATA_code(airportData.IATA_code);

      let data: IAirportData;

      if (!query) {
        const params = {
          latitude: airportData.latitude,
          longitude: airportData.longitude,
          hourly: [
            'temperature_2m',
            'apparent_temperature',
            'precipitation_probability',
            'precipitation',
            'weather_code',
            'cloud_cover',
            'cloud_cover_low',
            'visibility'
          ],
          timezone: 'auto',
          forecast_days: 1
        };

        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];
        const hourly = response.hourly()!;

        const weather: IWeatherForecast = {
          hourlyData: {
            utcOffsetSeconds: response.utcOffsetSeconds(),
            time: Number(hourly.time()),
            timeEnd: Number(hourly.timeEnd()),
            interval: hourly.interval()
          },
          temperature: hourly.variables(0)!.valuesArray()!,
          apparentTemperature: hourly.variables(1)!.valuesArray()!,
          precipitationProbability: hourly.variables(2)!.valuesArray()!,
          precipitation: hourly.variables(3)!.valuesArray()!,
          weatherCode: hourly.variables(4)!.valuesArray()!,
          cloudCover: hourly.variables(5)!.valuesArray()!,
          cloudCoverLow: hourly.variables(6)!.valuesArray()!,
          visibility: hourly.variables(7)!.valuesArray()!
        };

        data = {
          ...airportData,
          weatherForecast: weather
        };

        this.airports.push(data);

        const insertedAirport = createAirport(data);

        console.log(insertedAirport);
      } else {
        console.log('skipping insertion');
        data = query;
      }

      this.printToConsole(data);
    });
  };

  printToConsole = (data: IAirportData) => {
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    console.log(
      `Airport: ${data.IATA_code} Lat: ${data.latitude} Lon: ${data.longitude}`
    );

    for (let i = 0; i < 23; i++) {
      console.log(
        range(
          data.weatherForecast!.hourlyData.time,
          data.weatherForecast!.hourlyData.timeEnd,
          data.weatherForecast!.hourlyData.interval
        )
          .map(
            (t) =>
              new Date((t + data.weatherForecast!.hourlyData.utcOffsetSeconds) * 1000)
          )
          [i].toISOString()
          .substring(11)
          .replace(/:00.000Z/, ' hr ->'),
        data.weatherForecast?.temperature[i].toFixed(2) + ' °C ->',
        data.weatherForecast?.apparentTemperature[i].toFixed(2) + ' °C ->',
        data.weatherForecast?.precipitationProbability[i].toFixed(2) +
          ' % precipitation probability ->',
        data.weatherForecast?.precipitation[i].toFixed(2) + ' mm precipitation ->',
        this.wmoCodes.get(data.weatherForecast!.weatherCode[i]) + ' weather ->',
        data.weatherForecast?.cloudCover[i] + ' % cloud cover total ->',
        data.weatherForecast?.cloudCoverLow[i] + ' % cloud cover low ->',
        data.weatherForecast?.visibility[i].toLocaleString('en-US') + ' m visibility'
      );
    }

    console.log('\n');
  };
}

export default weatherAPI.instance;
