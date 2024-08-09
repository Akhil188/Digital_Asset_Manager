import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }
  navigate():void
  {
    this._router.navigate(['/dataAsset'])
  }

}
