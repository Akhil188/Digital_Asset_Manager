import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciroftrust',
  templateUrl: './ciroftrust.component.html',
  styleUrls: ['./ciroftrust.component.css']
})
export class CiroftrustComponent implements OnInit {
  public showModal : boolean = false;
  public showModal1 : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  searchText:any;
  ciroftrust = [
    { id: 11, name: 'Naveen'},
    { id: 12, name: 'John'},
    { id: 13, name: 'Peter'},
    { id: 14, name: 'Suresh'},
    { id: 15, name: 'Ram'},
    { id: 16, name: 'Sita'},
    { id: 17, name: 'Lucy'},
    { id: 18, name: 'George'},
  ];

}
