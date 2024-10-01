import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IFlightData } from './interfaces/flightData.interface';
import { FlightsDataService, AirportDataService } from './service';
import { PrimeNGConfig } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { IWeatherForecast } from './interfaces/weatherForecast.interface';
import { IAirportData } from './interfaces/airportData.interface';

// Weather interpretation codes defined by the WMO
const wmoCodes: Map<number, string> = new Map([
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
  [99, 'Heavy hail thunderstorm'],
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    DividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  items: IFlightData[] | [] = [];
  weatherAirport1: IWeatherForecast | undefined;
  weatherAirport2: IWeatherForecast | undefined;
  processedWeatherAirport1: {}[] = [];
  processedWeatherAirport2: {}[] = [];
  visible: boolean = false;

  constructor(
    private flightsDataService: FlightsDataService,
    private airportDataService: AirportDataService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.flightsDataService.getFlightsData().subscribe((data) => {
      this.items = data.flights;
    });
  }

  fetchWeather(iana_code1: string, iana_code2: string) {
    const processWeatherData = (data: IWeatherForecast): {}[] => {
      const range = (start: number, stop: number, step: number) =>
        Array.from(
          { length: (stop - start) / step },
          (_, i) => start + i * step
        );

      let weather = [];

      for (let i = 0; i < 24; i++) {
        weather.push({
          hour: range(
            data.hourlyData.time,
            data.hourlyData.timeEnd,
            data.hourlyData.interval
          )
            .map((t) => new Date((t + data.hourlyData.utcOffsetSeconds) * 1000))
            [i].toISOString()
            .substring(11)
            .replace(/:00.000Z/, ' hr'),
          temperature: data.temperature[i].toFixed(2) + ' °C',
          apparentTemperature: data.apparentTemperature[i].toFixed(2) + ' °C',
          precipitationProbability:
            data.precipitationProbability[i].toFixed(2) + ' %',
          precipitation: data.precipitation[i].toFixed(2) + ' mm',
          weatherCode: wmoCodes.get(data.weatherCode[i]) + ' weather',
          cloudCover: data.cloudCover[i] + ' %',
          cloudCoverLow: data.cloudCoverLow[i] + ' %',
          visibility: data.visibility[i].toLocaleString('en-US') + ' m',
        });
      }

      console.log('weather.length ', weather.length);

      return weather;
    };

    this.airportDataService.getAirportData(iana_code1).subscribe((data) => {
      const airport: IAirportData | undefined = data.airport;

      if (airport) {
        this.weatherAirport1 = airport.weatherForecast;

        this.processedWeatherAirport1 = processWeatherData(
          airport.weatherForecast!
        );
      }
    });

    this.airportDataService.getAirportData(iana_code2).subscribe((data) => {
      const airport: IAirportData | undefined = data.airport;

      if (airport) {
        this.weatherAirport2 = airport.weatherForecast;

        this.processedWeatherAirport2 = processWeatherData(
          airport.weatherForecast!
        );
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}
