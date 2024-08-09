import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  View():void
  {
    this.http.get(" http://3.7.32.15:8000/asset").subscribe(res => {
 let r = JSON.parse(JSON.stringify(res))
 //console.log(r.meta.otpReferId)
 console.log(res)
  }
  )}

}
