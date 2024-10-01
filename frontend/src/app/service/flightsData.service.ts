import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlightData } from '../interfaces/flightData.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsDataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) {}

  getFlightsData(): Observable<{ flights: IFlightData[] | [] }> {
    return this.httpclient.get<{ flights: IFlightData[] | [] }>(
      `${this.baseUrl}/api/v1/flights/`
    );
  }
}
