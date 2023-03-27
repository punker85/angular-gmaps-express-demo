import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent implements OnInit {  
  @Input() title: string = 'Default Title';

  constructor() {}

  ngOnInit(): void {}
}