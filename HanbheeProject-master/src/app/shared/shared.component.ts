import { Component, OnInit,Input,Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient,HttpResponse} from '@angular/common/http';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  Shared:any=[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get("http://3.7.32.15:8000/trans/").subscribe(res => {
      let r = JSON.parse(JSON.stringify(res))
      //console.log(r.meta.otpReferId)
      console.log(res)
      this.Shared=r.desc
      console.log(this.Shared)
  })
}
  
  


}
