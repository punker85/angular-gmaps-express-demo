import { Component, OnInit } from '@angular/core';
import { CrashEventService, StateService } from 'src/app/services';

@Component({
  selector: 'crash-event-list',
  templateUrl: './crash-event-list.component.html',
  providers: [ CrashEventService, StateService ],
  styleUrls: ['./crash-event-list.component.scss']
})
export class CrashEventListComponent implements OnInit {
  crashEvents: any[] | undefined;
  currentItem: number = 0;

  constructor(private crashEventService: CrashEventService, private stateService: StateService) {}

  ngOnInit(): void {
    this.showAllEvents();
    this.stateService.currentMarker.subscribe((value) => {
      this.currentItem = value;
    });
  }

  showAllEvents() {
    this.crashEventService.getAllEvents()
      .subscribe({
        next: (data: any) => {
          this.crashEvents = data.data;
        },
        error: error => console.log(error)
      });
  }

  setCurrent(item: number) {
    //this.currentItem = item;
    this.stateService.setCurrentMarker(item);
  }
}