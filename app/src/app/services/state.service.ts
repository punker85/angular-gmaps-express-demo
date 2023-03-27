import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable({ providedIn: 'root' })
export class StateService {
  currentMarker = new Subject<number>();
  //currentMarkerState = this.currentMarker.asObservable();

  constructor() {}

  setCurrentMarker(reportNum: number) {
    console.log('set: ' + reportNum);
    this.currentMarker.next(reportNum);
  }
}