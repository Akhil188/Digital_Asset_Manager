import { Component, OnInit ,Input} from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { visitLexicalEnvironment } from 'typescript';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  form3!: FormGroup;
  form4!:FormGroup;
  form5!:FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  public showModal : boolean = false;
  public showModal1 : boolean = false;
  step = 1;
  doc:string="";
  msg1:string="";
  msg2:string="";
  stat:string="";
  docs: string[] = [];
  fileName = '';
  status='';
  status1='';
  refid1=""
  codepattern="^[a-z A-Z]*$"; 
  codepattern1="^[0-9]*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  button1:boolean=true
  button2:boolean=false
  button3:boolean=false
  button4:boolean=false
  button5:boolean=false
  button6:boolean=true
  otpfield:boolean=false
  refid=""
  msg=""
  token1=""
  token2=""

  @Input() profile:any;
firstname:string="";
lname:string="";
city:string="";
state:string="";
zip:string="";
country:string="";
addr1:string="";

  @Input() mail:any;
  email:string="";
  phone:string="";
  otp:string="";

  @Input() card1:any;
datasset:string="";
pin:string="";
title:string="";
id:string="";
name:string="";
issuer:string="";
uid=''
expdate1=''
datasset1=''



  constructor(private formBuilder: FormBuilder,private http: HttpClient,private _router:Router) { }

  ngOnInit(): void 
  {
    this.datasset=this.card1;
    this.pin=this.card1;
    this.title=this.card1;
    this.id=this.card1;
    this.name=this.card1;
    this.issuer=this.card1;
    this.uid=this.card1
    this.expdate1=this.card1
    this.datasset1=this.card1
    this.email=this.mail;
    this.phone=this.mail;
    this.otp=this.mail;
    this.firstname=this.profile;
    this.lname=this.profile;
    this.city=this.profile;
    this.state=this.profile;
    this.zip=this.profile;
    this.country=this.profile;
    this.addr1=this.profile;
    

    //this.personalDetails = this.formBuilder.group({
      //name: ['', Validators.required],
      //datasset: [''],
     // url: [''],
     // title: ['']
      

  //});

  this.form3 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(13),Validators.pattern(this.mobnumPattern)]),
    otp:new FormControl('',Validators.required)
  });

  this.form4 = new FormGroup({
    firstname: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    lname: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    addr1: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required, Validators.pattern(this.codepattern)]),
    state: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    zip: new FormControl('', [Validators.required,Validators.pattern(this.codepattern1)]),
    country: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
    expdate: new FormControl('',[Validators.required]),

  });

  }
   
  
  
 // get personal() { return this.personalDetails.controls; }
  get f1() { return this.form4.controls; }
  get f(){return this.form3.controls}

  

  next(){
    if(this.step==1){
          this.personal_step = true;
         if (this.form3.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.form4.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }
  

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post(" http://3.7.32.15:8000/upload/", formData).subscribe(res => {
          let r = JSON.parse(JSON.stringify(res))
          //console.log(r.meta.otpReferId)
          console.log(res)
          console.log(r.desc.thumbnail[0])
          let a=r.desc.thumbnail[0]
          let b=Object.keys(a)
          console.log(b[0])
         this.doc=b[0]
         this.docs.push(b[0])
         console.log(this.docs)
         console.log(r.msg)
         this.msg1=r.msg
 
         })
        
       // upload$.subscribe();
    }
}

submit(){
  //if(this.step==3){
    //this.education_step = true;
    //if (this.form3.invalid) { return }
  //}

 
  var val={
    "assetid" : this.datasset,
    "pin" : this.pin,
    "customTitle":this.title,
    "assetInfo":{
        "data":{
            "id" : this.id,
            "name" : this.name
        },
        "upload":{
            "idcard":this.docs
        }
  }};
  this.http.post(" http://3.7.32.15:8000/asset/",val).subscribe(res => {
     let r = JSON.parse(JSON.stringify(res))
     //console.log(r.meta.otpReferId)
     console.log(res)
     console.log(r.msg[0])
     this.msg2=r.msg[0]
     this.stat=r.status
     this.status1=r.msg

   })
}

submit1():void
{
  this._router.navigate(['/dashboard'])
}


  Save():void
  {
    console.log(this.personalDetails)
    console.log(this.addressDetails)
    console.log(this.form3)
    
  }

  

Register():void
{
  var  val3={
    "authType" : "email",
    "authId":this.email,
    phone:this.phone,
};

this.http.post("http://3.7.32.15:8000/register/new/",val3).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))

  this.status=r.status;
  this.refid1=r.meta.otpReferId;
  if(this.status=='success')
  {
    this.status="Otp Sent Successfully";
    this.otpfield=true;
    //this.button3=false;
    this.button4=true;
    this.button1=false

  }
  //  else if(this.status=="failed"){
  //   window.alert("User Account exist with the given email");
  // }
})
}

Register1():void
{
  var  val1={
    "authType" : "email",
    "authId":this.email,
    "otpReferId":this.refid1,
    "otp":this.otp,
    "phone":this.phone,
  };
  //console.log(this.email)
  //console.log(this.refid1)
  //console.log(this.otp)

  this.http.post(" http://3.7.32.15:8000/register/verify/",val1).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  this.status1=r.status;
  this.msg=r.msg
  this.token2=r.token.tokens.access;
  localStorage.setItem('token',this.token2)
  console.log(r)
  if(this.msg=='Invalid OTP')
  {
    this.status="Please enter a valid OTP";
    
  }
  else
  {
    swal("Registered Successfully");
    this.status="Registered Successfully";
   // this._router.navigate(['/profnav/persinfo'])
   this.next()
    
  }

})
}



Redirect():void
{
  this._router.navigate(['/login'])
}


next1():void
 {
   console.log(this.form4)
   var val={
    "myname":{
      "firstname":this.firstname,
      "lastname":this.lname
      },
      "address":{
          "city":this.city,
          "mystate":this.state,
          "country":this.country,
          "zipcode":this.zip
      },
    };
  this.http.post(" http://3.7.32.15:8000/profile/",val).subscribe(res => {
  let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)
  this.status=r.status;
  console.log(this.status)
  if(this.status=='success')
  {
    swal("Profile data is saved successfully");
    this.button1=false
    this.button2=true
    this.form4.disable()
  }




})
  //this._router.navigate(['/createaccount/publicprofile'])
 
 
}

  
}
