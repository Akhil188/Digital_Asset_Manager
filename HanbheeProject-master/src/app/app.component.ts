import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';

  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router,private http:HttpClient) { }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

 
}
