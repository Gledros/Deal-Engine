import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAirportData } from '../interfaces/airportData.interface';

@Injectable({
  providedIn: 'root',
})
export class AirportDataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpclient: HttpClient) {}

  getAirportData(
    iana_code: string
  ): Observable<{ airport: IAirportData | undefined }> {
    return this.httpclient.get<{ airport: IAirportData | undefined }>(
      `${this.baseUrl}/api/v1/airports/${iana_code}`
    );
  }
}
