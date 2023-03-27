import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crash-event-item',
  templateUrl: './crash-event-item.component.html',
  styleUrls: ['./crash-event-item.component.scss']
})
export class CrashEventItemComponent implements OnInit {
  @Input() reportNum: number = 0;
  @Input() crashDate: string = '1999-01-01';
  @Input() crashTime: string = '12:00';
  @Input() county: string = 'County';
  @Input() city: string = 'City';
  @Input() active: boolean = false;

  @Output() activated = new EventEmitter<number>();
  @Output() deactivated = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.active = !this.active;
    if(this.active) {
      this.activated.emit(this.reportNum);
    } else {
      this.deactivated.emit(this.reportNum);
    }
  }
}