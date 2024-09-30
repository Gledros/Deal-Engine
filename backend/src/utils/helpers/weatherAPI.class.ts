import { airportDataType } from '../types';
import { emitter } from './eventEmitter.class';
import { fetchWeatherApi } from 'openmeteo';

class weatherAPI {
  static #instance: weatherAPI;

  private static maxConnections: number = 10;
  private currentConnections: number = 0;
  private airports: airportDataType[] = [];

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
    // TODO: change .once for .on
    eventEmitter.once('newAirport', async (airportData: airportDataType) => {
      const params = {
        latitude: airportData.latitude,
        longitude: airportData.longitude,
        hourly: [
          'temperature_2m',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'cloud_cover_low'
        ],
        timezone: 'auto',
        forecast_days: 1
      };

      const url = 'https://api.open-meteo.com/v1/forecast';
      const responses = await fetchWeatherApi(url, params);

      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      // const timezone = response.timezone();
      // const timezoneAbbreviation = response.timezoneAbbreviation();
      // const latitude = response.latitude();
      // const longitude = response.longitude();

      const hourly = response.hourly()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        hourly: {
          time: range(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          precipitation: hourly.variables(1)!.valuesArray()!,
          weatherCode: hourly.variables(2)!.valuesArray()!,
          cloudCover: hourly.variables(3)!.valuesArray()!,
          cloudCoverLow: hourly.variables(4)!.valuesArray()!
        }
      };

      // `weatherData` now contains a simple structure with arrays for datetime and weather data
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        console.log(
          weatherData.hourly.time[i]
            .toISOString()
            .substring(11)
            .replace(/:00.000Z/, ' hr ->'),
          weatherData.hourly.temperature2m[i].toFixed(2) + ' °C ->',
          weatherData.hourly.precipitation[i].toFixed(2) + ' precipitation ->',
          this.wmoCodes.get(weatherData.hourly.weatherCode[i]) + ' weather ->',
          weatherData.hourly.cloudCover[i] + ' cloud cover total ->',
          weatherData.hourly.cloudCoverLow[i] + ' cloud cover low'
        );
      }

      const data = {
        ...airportData,
        weatherForecast: {} //TODO: to fill with the retrieved data
      };

      this.airports.push(data);
    });
  };
}

export default weatherAPI.instance;
