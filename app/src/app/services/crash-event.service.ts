import { Injectable } from '@angular/core';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface CrashEvent {
  report_number: string;
  crash_date: Date;
  crash_time: Time;
  county: string;
  city: string;
  investigating_agency: string;
  on_street: string;
  offset_feet: number;
  offset_direction: string;
  from_intersecting_street: string;
  crash_severity: string;
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class CrashEventService {
  baseUrl = 'http://localhost:3001';
  eventUrl = this.baseUrl + '/event/'
  allEventsUrl = this.eventUrl + 'all';

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get(this.allEventsUrl);
  }

  getEvent(reportNum: number) {
    console.log('getEvent: ' + reportNum);
    return this.http.get(this.eventUrl + reportNum);
  }
}
