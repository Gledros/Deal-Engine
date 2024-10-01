import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IFlightData } from './interfaces/flightData.interface';
import { FlightsDataService } from './service/flightsData.service';
import { PrimeNGConfig } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableModule, DialogModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  items: IFlightData[] | [] = [];
  visible: boolean = false;

  constructor(
    private flightsDataService: FlightsDataService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.flightsDataService.getFlightsData().subscribe((data) => {
      this.items = data.flights;
    });
  }

  fetchWeather() {
    //TODO: fetch weather data on hover
  }

  showDialog() {
    this.visible = true;
  }
}
