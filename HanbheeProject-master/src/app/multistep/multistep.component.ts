import { Component, OnInit ,Input} from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { visitLexicalEnvironment } from 'typescript';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-multistep',
  templateUrl: './multistep.component.html',
  styleUrls: ['./multistep.component.css']
})
export class MultistepComponent implements OnInit {
  closeModal: string;
  button1:boolean=true
  text1:boolean=false
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  form3!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  public showModal : boolean = false;
  public showModal1 : boolean = false;
  step = 1;
  doc:string="";
  msg:string="";
  msg1="";
  msg2:string="";
  stat:string="";
  docs: string[] = [];
  files:string[]=[];
  fileName = '';
  status='';
  status1='';
  user1:string="";
  user2:string="";
  user3:string="";
  value1="";
  value2="";
  value3="";
b=[];

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
assmsg=''



  constructor(private formBuilder: FormBuilder,private http: HttpClient,private modalService: NgbModal) { }

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

    

    //this.personalDetails = this.formBuilder.group({
      //name: ['', Validators.required],
      //datasset: [''],
     // url: [''],
     // title: ['']
      

  //});

  this.personalDetails = new FormGroup({
        name: new FormControl('', [Validators.required]),
    datasset: new FormControl(''),
    url: new FormControl(''),
    title: new FormControl(''),
  });

  this.addressDetails = this.formBuilder.group({
     pin: ['', Validators.required],
      id: ['',Validators.required],
      issuer: [''],
      expdate:[''],

      
  });


  this.form3=this.formBuilder.group({
    datasset1:['',Validators.required],
    pin: ['', Validators.required],
    expdate1:[''],
    uid: [''],
    
  });
  }
  
  get personal() { return this.personalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  get f(){return this.form3.controls}

  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
           this.getusers()
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
  getusers():void{
    this.http.get("http://3.7.32.15:8000/digitalid/users/").subscribe(res => {
      //let r = JSON.parse(JSON.stringify(res))
      //console.log(r.meta.otpReferId)
      
      let r = JSON.parse(JSON.stringify(res))
      console.log(r)
      let c =Object.keys(r)
       this.b =Object.values(r)
      this.user1=c[0]
      this.user2=c[1]
      this.user3=c[2]
      this.value1=this.b[0]
      this.value2=this.b[1]
      this.value3=this.b[2]
    })

  }
  

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();
        //The FormData interface provides a way to easily construct a set of key/value pairs

        formData.append("thumbnail", file);

        const upload$ = this.http.post("http://3.7.32.15:8000/upload/", formData).subscribe(res => {
          let r = JSON.parse(JSON.stringify(res))

          //console.log(r.meta.otpReferId)
          console.log(res)
          this.assmsg=r.msg
          //console.log(r.desc.thumbnail[0])
          let a=r.desc.thumbnail[0]
          let b=Object.keys(a)
          let c=Object.values(a)
          console.log(b[0])
          this.files.push(this.fileName)
          console.log(this.files)
          
         this.doc=b[0]
         this.docs.push(b[0])
         //console.log(this.docs)
         //console.log(r.msg)
         this.msg1=r.msg
 
         })
        
       // upload$.subscribe();
    }
}
triggerModal(content:any) {

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    
  });

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
Save1(content:any,content1:any):void
{

  var val={
    "authType":"email",
    "authId": content.value
  };
  console.log(val)
  this.http.post("http://3.7.32.15:8000/digitalid/users/",val).subscribe(res => {
  //let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)
  let r = JSON.parse(JSON.stringify(res))
  this.msg1=r.msg1;
  if(this.msg1!=null){
  
  swal("User have been added");
  this.getusers()
  this.modalService.dismissAll()
  
  
  }

})
  
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
  this.http.post("http://3.7.32.15:8000/asset/",val).subscribe(res => {
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
  var u=this.uid
  var a: any={}
  for(var i of u){
    
    a[i]={
      "expiry":""
    }
    
  }

  console.log(a)
  var val={
    "assetid" : this.datasset1,
    "pin" : this.pin,
    "expiry":this.expdate1,
    "receivers":a
  }
    
      
this.http.post("http://3.7.32.15:8000/trans/",val).subscribe(res => {
     let r = JSON.parse(JSON.stringify(res))
     //console.log(r.meta.otpReferId)
     console.log(res)
     
     if(r.msg=="New Transaction Created")
     {
       this.status="Assets Shared Successfully"
     }
     else
     {
       this.status="Failed to Share Assets"
     }
    
   })

}
trigger():void{
  var val={
   
  };
  this.http.post("http://3.7.32.15:8000/digitalid/remove/",val).subscribe(res => {
    //let r = JSON.parse(JSON.stringify(res))
    //console.log(r.meta.otpReferId)
    console.log(res)
    let r = JSON.parse(JSON.stringify(res))
    this.msg=r.msg
    
    if(this.msg!=null){
    
    swal(this.msg);
    this.getusers()
 }

})
  
}


  Save():void
  {
    console.log(this.personalDetails)
    console.log(this.addressDetails)
    console.log(this.form3)
    
    
  
  }

  
}
