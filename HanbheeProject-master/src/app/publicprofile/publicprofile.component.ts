import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-publicprofile',
  templateUrl: './publicprofile.component.html',
  styleUrls: ['./publicprofile.component.css']
})
export class PublicprofileComponent implements OnInit {
  closeModal: string;
  codepattern="^[a-z A-Z]*$"; 
codepattern1="^[0-9]*$";
codepattern3="^[0-9 a-z A-Z]*$"
 urlpat = '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$';
 linkedinpat='^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$';
 button1:boolean=true
 button2:boolean=true
 text1:boolean=false
 text2:boolean=false
 digid="Lekhya"
 msg1=""
 email=""
 keymsg="Key Successfully Created"
firstname:string="";
 form2 = new FormGroup({
  key: new FormControl('', [Validators.required,Validators.pattern(this.codepattern1)]),
  city: new FormControl('', [Validators.required, Validators.pattern(this.codepattern)]),
  state: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
  zip: new FormControl('', [Validators.required,Validators.pattern(this.codepattern1)]),
  country: new FormControl('', [Validators.required,Validators.pattern(this.codepattern)]),
  weburl: new FormControl('', [Validators.pattern(this.urlpat)]),
  socprof: new FormControl('', [Validators.pattern(this.linkedinpat)]),
  securitykey: new FormControl('',[Validators.required,Validators.pattern(this.codepattern3),Validators.maxLength(6)])
});
get f(){
  return this.form2.controls;
}


  constructor(private _activatedRoute:ActivatedRoute
    ,private _router:Router,private http:HttpClient,private modalService: NgbModal) { }

 @Input() profile:any;
city:string="";
state:string="";
zip:string="";
country:string="";
aboutme:string="";
websitename:string="";
socprof:string="";
securitykey:string=""

  ngOnInit(): void {
    this.city=this.profile;
    this.state=this.profile;
    this.zip=this.profile;
    this.country=this.profile;
    this.aboutme=this.profile;
    this.websitename=this.profile;
    this.socprof=this.profile;
    this.securitykey=this.profile;

    this.http.get("http://3.7.32.15:8000/profile/").subscribe(res => {
 let r = JSON.parse(JSON.stringify(res))
 //console.log(r.meta.otpReferId)
 console.log(res)

this.firstname=r[0].profile.myname.firstname;
this.city=r[0].profile.address.city;
this.state=r[0].profile.address.mystate;
this.country=r[0].profile.address.country;
this.zip=r[0].profile.address.zipcode;
this.aboutme=r[0].profile.aboutme;
this.websitename=r[0].profile.socialmedia.website;
this.socprof=r[0].profile.socialmedia.linkedin;
this.email=r[0].auth.email[0]

}) 

  }

  next():void
 {

   var val={
      "address":{
          "city":this.city,
          "mystate":this.state,
          "country":this.country,
          "zipcode":this.zip
      },
      "aboutme":this.aboutme,
      "socialmedia":{
         "linkedin":this.socprof,
         "website":this.websitename,
   }
  
  };
  this.http.post("http://3.7.32.15:8000/profile/",val).subscribe(res => {
  //let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)


})
  //this._router.navigate(['/createaccount/publicprofile'])
 
 
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

Save(content:any):void
{
  var val={
    "pin":this.securitykey,
  };
  this.http.post("http://3.7.32.15:8000/keys",val).subscribe(res => {
  //let r = JSON.parse(JSON.stringify(res))
  //console.log(r.meta.otpReferId)
  console.log(res)
  let r = JSON.parse(JSON.stringify(res))
  
  this.msg1=r.msg;
  if(this.msg1=="Keys already exists")
  {window.alert("Keys already exists")
  this.modalService.dismissAll()
    this.button1=false
    this.text1=true
  }

})
  
}
DigitalId():void
{
  var val={
   
  };
  this.http.post("http://3.7.32.15:8000/digitalid/",val).subscribe(res => {
    //let r = JSON.parse(JSON.stringify(res))
    //console.log(r.meta.otpReferId)
    console.log(res)
    let r = JSON.parse(JSON.stringify(res))
    let x=r.msg
    if(x=="Digital Id already generated" || x=="Digital Id created successfully")
    {
      this.button2=false
      this.http.get(" http://3.7.32.15:8000/profile/").subscribe(res => {
      let r = JSON.parse(JSON.stringify(res))
 //console.log(r.meta.otpReferId)
    console.log(res)
        let p=r[0].digitalId
        this.digid=p
    console.log("Dig ID"+p)
        this.text2=true
  }) 
      
    }

})
}
}
