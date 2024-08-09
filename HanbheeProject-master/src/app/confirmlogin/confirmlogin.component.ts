import { Component, OnInit,Input,Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient,HttpResponse} from '@angular/common/http';
import * as fileSaver from 'file-saver';



@Component({
  selector: 'app-confirmlogin',
  templateUrl: './confirmlogin.component.html',
  styleUrls: ['./confirmlogin.component.css']
})
@Injectable({ providedIn: 'root' })
export class ConfirmloginComponent implements  OnInit {
  doc:string="";
msg1:string="";
msg2:string="";
stat:string="";
a:any="";
asse: string[]=[];
from: string[]=[];
exp: string[]=[];

docs: string[] = [];
  constructor(private http: HttpClient) { }

@Input() card:any;
AssetId:string="";
pin:string="";
title:string="";
id:string="";
name:string="";
issuer:string="";

  ngOnInit(): void {
    this.AssetId=this.card;
    this.pin=this.card;
    this.title=this.card;
    this.id=this.card;
    this.name=this.card;
    this.issuer=this.card;
  }
  
 
fileName = '';

form = new FormGroup({
  AssetId:new FormControl(''),
  pin:new FormControl(''),
title:new FormControl(''),
id:new FormControl(''),
name:new FormControl(''),
issuer:new FormControl(''),
});
get f(){
  return this.form.controls;
}


onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("http://3.7.32.15:8000/upload", formData).subscribe(res => {
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

create():void
{
var val={
  "assetid" : this.AssetId,
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
 })
}
submit():void{
  console.log(this.form)
}
viewall():void{
  this.http.get("http://3.7.32.15:8000/asset/").subscribe(res => {
    let r = JSON.parse(JSON.stringify(res))
    //console.log(r.meta.otpReferId)
    console.log(res)
   
   }) 
  }
  viewparticular():void{
   var val={
    "assetid" : this.AssetId,
    "pin" : this.pin,   
    };
  this.http.post("http://3.7.32.15:8000/asset/view/",val).subscribe(res => {
     let r = JSON.parse(JSON.stringify(res))
     //console.log(r.meta.otpReferId)
     console.log(res)
    
   })
   
    
}

send():void{
  var val={
    "assetid" : "HB-AS-1001",
    "pin" : "abc123",
    "expiry":"20-02-2022 10:10",
    "receivers":{
        "1051W4PY327L6A4A":{
            "expiry" :""
        }
      
    }
}
this.http.post("http://3.7.32.15:8000/trans/",val).subscribe(res => {
     let r = JSON.parse(JSON.stringify(res))
     //console.log(r.meta.otpReferId)
     console.log(res)
    
   })

}

receive():void{
  this.http.get(" http://3.7.32.15:8000/trans/received").subscribe(res => {
    let r = JSON.parse(JSON.stringify(res))
    //console.log(r.meta.otpReferId)
    console.log(res)
    this.a=r.desc
    for(var i of this.a)
    {
      console.log(i.assetid)
      this.asse.push(i.assetid)
      this.from.push(i.from)
      this.exp.push(i.expiry)
    }
    console.log(this.asse)
    
   
   }) 
}
downloadFile(): any {

  var val={
    "assetid" : "HB-AS-1001",
    "pin" : "abc123",
    "file":"all"
}
  return this.http.post("http://3.7.32.15:8000/asset/download/",val, {responseType: 'blob'});
}

download() {
  //this.fileService.downloadFile().subscribe(response => {
  this.downloadFile().subscribe((response: any) => { //when you use stricter type checking
    let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    //window.open(url);
    //window.location.href = response.url;
    fileSaver.saveAs(blob, 'files.tgz');
  //}), error => console.log('Error downloading the file'),
  }), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
               () => console.info('File downloaded successfully');
}


//npm install file-saver --force
//npm install @types/file-saver --save-dev







}
