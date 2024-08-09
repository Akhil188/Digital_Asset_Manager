import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
//import {LogindataService} from '.././logindata.service';
import {HttpClient} from '@angular/common/http';
//import { HttpInterceptor } from '@angular/common/http';
import swal from 'sweetalert';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
 
  text='';
  status='';
  status1='';
  refid='';
  refid1='';
  msg='';
  tok='';
  message='';
  otpfield:boolean=false
  button1:boolean=true
  button2:boolean=false
  button3:boolean=false
  button4:boolean=false
  button5:boolean=false
  check:boolean=false
  //public colour={"color":this.check?"green":"red"};
  
  
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  
  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router,private http:HttpClient) { }

  @Input() mail:any;
  email:string="";
  phone:string="";
  otp:string="";
  

  ngOnInit(): void {
    this.email=this.mail;
    this.phone=this.mail;
    this.otp=this.mail;
    //this.colour={"color":this.check?"green":"red"};
  }
  form3 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(13),Validators.pattern(this.mobnumPattern)]),
    otp:new FormControl('',Validators.required)
  });
  get f(){
    return this.form3.controls;
  }
  
  submit(){
    console.log(this.form3.value);
  }

  onButtonClick():void
  {
    let data:any=this.form3.value;
  this._router.navigate(['/confirm'],{
queryParams:{data:btoa(JSON.stringify(data))}

  })
  }

 

  add():void
{
  
  var  val={
    "authType" : "email",
    "authId":this.email,
    phone:this.phone,
};
// https://3acq841az6.execute-api.ap-south-1.amazonaws.com/dev/
this.http.post("http://3.7.32.15:8000/login/auth/",val).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)
  //alert(r.msg)
  this.status=r.status;
  this.message=r.msg;
  
  if(this.status=='success')
  {
   this.status=" Please enter OTP";
    this.refid=r.meta.otpReferId;
    this.otpfield=true;
    this.button1=false;
    this.button2=true;
    this.check=true;
  }
  else if(this.status=='failed' && this.message=='Already logged in')
  {
        this.status="Already logged in";
        this.button5=true;
        this.button1=false;
  }
  else if(this.status=='failed')
  {
    this.status="Not a registered user"
   this.button3=true
   this.button1=false
   this.check=false
    
  }


  })
  
  //this._router.navigate(['/confirm'])
}

buttonAction():void
{
  var  val1={
    "authType" : "email",
    "authId":this.email,
    "otpReferId":this.refid,
    "otp":this.otp,
    phone:this.phone,
  };
  //console.log(this.email)
  //console.log(this.refid)
  //console.log(this.otp)
  
this.http.post("http://3.7.32.15:8000/login/verify/",val1).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  this.status1=r.status;
  this.msg=r.msg;
  console.log(r)
  this.tok=r.token.tokens.access
  localStorage.setItem('token',this.tok);
  if(this.msg=='Invalid OTP')
  {
    this.status="Please enter a valid OTP";
    this.check=false
  }
  else
  {
    this.status="Authenticated Successfully";
    this.check=true
    this._router.navigate(['/profnav/profile'])
  }
  


})
  
}

Register():void
{
  var  val3={
    "authType" : "email",
    "authId":this.email,
    phone:this.phone,
};

this.http.post(" http://3.7.32.15:8000/register/new/",val3).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))

  this.status=r.status;
  this.refid1=r.meta.otpReferId;
  if(this.status=='success')
  {
    this.status=" Please enter OTP";
    this.otpfield=true;
    this.button3=false;
    this.button4=true;
    this.check=true
    

  }
})
}

Register1():void
{
  var  val1={
    "authType" : "email",
    "authId":this.email,
    "otpReferId":this.refid1,
    "otp":this.otp,
    phone:this.phone,
  };
  console.log(this.email)
  console.log(this.refid1)
  console.log(this.otp)

  this.http.post("http://3.7.32.15:8000/register/verify/",val1).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  this.status1=r.status;
  this.msg=r.msg;
  console.log(r)
  this.tok=r.token.tokens.access
  localStorage.setItem('token',this.tok);
  if(this.msg=='Invalid OTP')
  {
    this.status="Please enter a valid OTP";
    this.check=false
  }
  else
  {
    this.status="Registered Successfully";
    this.check=true
    this._router.navigate(['/profnav/persinfo'])
  }

})
}

getToken()
{
  return localStorage.getItem('token')
}

Profile():void
{
  this._router.navigate(['/profnav/profile'])
}

}
