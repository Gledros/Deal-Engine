export interface IWeatherForecast {
  hourlyData: {
    utcOffsetSeconds: number;
    time: number;
    timeEnd: number;
    interval: number;
  };
  temperature: Float32Array;
  apparentTemperature: Float32Array;
  precipitationProbability: Float32Array;
  precipitation: Float32Array;
  weatherCode: Float32Array;
  cloudCover: Float32Array;
  cloudCoverLow: Float32Array;
  visibility: Float32Array;
}
