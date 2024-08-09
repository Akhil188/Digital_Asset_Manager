import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data-assets',
  templateUrl: './data-assets.component.html',
  styleUrls: ['./data-assets.component.css']
})
export class DataAssetsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router) { }

  ngOnInit(): void {
  }
  Upload():void
  {
    this._router.navigate(['/multistep'])
  }

}
