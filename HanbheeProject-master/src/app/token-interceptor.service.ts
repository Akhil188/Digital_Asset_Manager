import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:any,next:any)
  {
    let token1=localStorage.getItem('token')
    console.log("PRE"+token1+"POST")
    if (token1==null || token1==""){
      let tokenizedReq=req.clone({
      })
      return next.handle(tokenizedReq)
    }
    let authService=this.injector.get(AuthService)
    let tokenizedReq=req.clone({
      setHeaders: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
