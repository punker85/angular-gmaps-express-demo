import { Component, OnInit } from '@angular/core';
import { CrashEventService, StateService } from 'src/app/services';

@Component({
  selector: 'crash-event-details',
  templateUrl: './crash-event-details.component.html',
  styleUrls: ['./crash-event-details.component.scss']
})
export class CrashEventDetailsComponent implements OnInit {
  
  crashEvent: any | undefined;

  constructor(private crashEventService: CrashEventService) {}

  ngOnInit(): void {
  }

  showEvent(reportNum: number) {
    console.log('showEvent: ' + reportNum);
    if(reportNum != 0) {
      this.crashEventService.getEvent(reportNum)
      .subscribe({
        next: (data: any) => {
          this.crashEvent = data.data[0];
        },
        error: error => console.log(error)
      });
    }
  }
}