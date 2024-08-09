import { Component, OnInit,Input } from '@angular/core';
import {EmailValidator, FormControl, FormGroup,Validators} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  codepattern="^[a-z A-Z]*$"; 
  codepattern1="^[0-9]*$";
  codepattern2="^[a-z A-Z 0-9]*$";
  datepattern="^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$";
  button1:boolean=true
  button2:boolean=false
  status=''

  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router,private http:HttpClient
) { 
  

}

@Input() profile:any;
firstname:string="";
mname:string="";
lname:string="";
city:string="";
state:string="";
zip:string="";
country:string="";
income:string="";
gender:string="";
maritialstatus:string="";
addr1:string="";
addr2:string="";
dlid:string="";
d1="";
d2="";
d3="";
d4="";
is1:string="";
is2:string="";
is3:string="";
is4:string="";
p1:string="";
p2:string="";
key:string="";
email:string="";

  ngOnInit(): void {
    this.firstname=this.profile;
    this.mname=this.profile;
    this.lname=this.profile;
    this.city=this.profile;
    this.state=this.profile;
    this.zip=this.profile;
    this.country=this.profile;
    this.income=this.profile;
    this.gender=this.profile; 
    this.maritialstatus=this.profile; 
    this.addr1=this.profile; 
    this.addr2=this.profile; 
    this.dlid=this.profile; 
    this.d1=this.profile; 
    this.d2=this.profile; 
    this.d3=this.profile; 
    this.d4=this.profile; 
    this.is1=this.profile; 
    this.is2=this.profile; 
    this.is3=this.profile; 
    this.is4=this.profile; 
    this.p1=this.profile; 
    this.p2=this.profile; 
    this.key=this.profile; 
    this.email=this.profile; 

    this.http.get("http://3.7.32.15:8000/profile/").subscribe(res => {
 let r = JSON.parse(JSON.stringify(res))
 //console.log(r.meta.otpReferId)
 console.log(res)

this.firstname=r[0].profile.myname.firstname;
this.mname=r[0].profile.myname.middlename;
this.lname=r[0].profile.myname.lastname;
this.city=r[0].profile.address.city;
this.state=r[0].profile.address.mystate;
this.country=r[0].profile.address.country;
this.zip=r[0].profile.address.zipcode;
this.gender=r[0].profile.gender;
this.maritialstatus=r[0].profile.maritalStatus;
this.income=r[0].profile.annualIncome;

console.log("s"+this.firstname+"s")
if(this.firstname!="") 
   {
    this.form4.disable()
    this.button1=false
    this.button2=true

   }
}) 
let token1=localStorage.getItem('token')
  


  }

  form4 = new FormGroup({
    firstname: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    mname: new FormControl('', [Validators.pattern(this.codepattern)]),
    lname: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    addr1: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern(this.codepattern)]),
    state: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    zip: new FormControl('', [Validators.required,Validators.pattern(this.codepattern1)]),
    country: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    income:new FormControl('',[Validators.required,Validators.pattern(this.codepattern1)]),
    dlid:new FormControl('',[Validators.pattern(this.codepattern1)]),
    is1:new FormControl('', [Validators.pattern(this.codepattern)]),
    is2:new FormControl('', [Validators.pattern(this.codepattern)]),
    is3:new FormControl('', [Validators.pattern(this.codepattern)]),
    is4:new FormControl('', [Validators.pattern(this.codepattern)]),
    p1:new FormControl('', [Validators.pattern(this.codepattern2)]),
    p2:new FormControl('', [Validators.pattern(this.codepattern2)]),
    key:new FormControl('',[Validators.pattern(this.codepattern1)]),
    d1:new FormControl('',Validators.pattern(this.datepattern)),
    d2:new FormControl('',Validators.pattern(this.datepattern)),
    d3:new FormControl('',Validators.pattern(this.datepattern)),
    d4:new FormControl('',Validators.pattern(this.datepattern)),
    gender:new FormControl('',Validators.required),
    maritialstatus:new FormControl('',Validators.required),
  });

  get f(){
    return this.form4.controls;
    
  }
  
  
  submit(){
    console.log(this.form4);
    
  }

 next():void
 {
   console.log(this.form4)
   var val={
    "myname":{
      "firstname":this.firstname,
      "middlename":this.mname,
      "lastname":this.lname
      },
      "address":{
          "city":this.city,
          "mystate":this.state,
          "country":this.country,
          "zipcode":this.zip
      },
      "gender":this.gender,
      "maritalStatus":this.maritialstatus,
      "annualIncome":this.income,
    };
  this.http.post("http://3.7.32.15:8000/profile/",val).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)
  this.status=r.status;
  console.log(this.status)
  if(this.status=='success')
  {
    window.alert("profile data is successfully saved")
    this.button1=false
    this.button2=true
    this.form4.disable()
  }

  


})
  //this._router.navigate(['/createaccount/publicprofile'])
 
 
}

update1():void
{
  this.form4.enable()
  this.button1=true
  this.button2=false
}



}
