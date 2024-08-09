import { Component, OnInit,Input,Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient,HttpResponse} from '@angular/common/http';
import * as fileSaver from 'file-saver';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
@Injectable({ providedIn: 'root' })

export class ReceiveComponent implements OnInit {

  doc:string="";
  msg1:string="";
  msg2:string="";
  stat:string="";
  a:any="";
  abc:any="";
  asse: string[]=[];
  from: string[]=[];
  exp: string[]=[];
  EmployeeList:any=[];
  SharedAsset:any=[];
  Shared:any=[];
  ViewList:any=[];
  name1:string="";

  
  docs: string[] = [];
    constructor(private http: HttpClient,private modalService: NgbModal) { 
      
    }
  
  @Input() card:any;
  AssetId:string="";
  pin:string="";
  title:string="";
  id:string="";
  name:string="";
  issuer:string="";
  closeModal:any;
  
    ngOnInit(): void {
      this.AssetId=this.card;
      this.pin=this.card;
      
     
      this.http.get("http://3.7.32.15:8000/trans/received/").subscribe(res => {
      let r = JSON.parse(JSON.stringify(res))
      //console.log(r.meta.otpReferId)
      console.log(res)
      // this.EmployeeList=r.desc
      this.EmployeeList=r.desc
      console.log("hi"+this.EmployeeList)
      this.a=r.desc
     
      //console.log(this.asse)
      
     
     })
    }
    
   
  fileName = '';
  
  form = new FormGroup({
    AssetId:new FormControl(''),
    pin:new FormControl(''),
  
  });
  get f(){
    return this.form.controls;
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
  submit():void{
    console.log(this.form)
  } 
 
  acceptOrReject(resp:any,transid:any):void{
    var val={
      "transid" : transid,
      "response" : "",
      "pin" : this.pin

    }
    if(resp=="accept"){
      val.response="accept"
    }
    else{
      val.response="reject"
    }
    this.http.post("http://3.7.32.15:8000/trans/received/response",val).subscribe(res => {
       let r = JSON.parse(JSON.stringify(res))
       //console.log(r.meta.otpReferId)
       console.log(res)
      
     })
     
  }

  view1(transid:any):void{
    var val={
      "transid" : transid,
      
      "pin" : this.pin

    }
    // this.http.post("https://mb7qtm56k7.execute-api.ap-south-1.amazonaws.com/dev2/trans/received/view",val).subscribe(res => {
      this.http.post("http://3.7.32.15:8000/trans/received/view",val).subscribe(res => {
       let r = JSON.parse(JSON.stringify(res))
       //console.log(r.meta.otpReferId)
       console.log(res)
       this.name1=r.msg.info.data.name
       this.ViewList=r.msg.info.uploads.idcard
      
     })
  }
  downloadFile(transid:any): any {

    var val={
      "transid" : transid,
      "pin" : this.pin,
      "file":"all"
  }
  this.abc=transid
    // return this.http.post("https://mb7qtm56k7.execute-api.ap-south-1.amazonaws.com/dev2/trans/received/download/",val, {responseType: 'blob'});
    return this.http.post("http://3.7.32.15:8000/trans/received/download",val, {responseType: 'blob'});
  }
  
  downloadfile(transid:any) {
    //this.fileService.downloadFile().subscribe(response => {
    this.downloadFile(transid).subscribe((response: any) => { //when you use stricter type checking
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, 'files.tgz');
    //}), error => console.log('Error downloading the file'),
    }), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
                 () => console.info('File downloaded successfully');
  }

  shared():void{
    this.http.get("http://3.7.32.15:8000/trans/").subscribe(res => {
      let r = JSON.parse(JSON.stringify(res))
      //console.log(r.meta.otpReferId)
      console.log(res)
      this.Shared=r.desc
      console.log(this.Shared)

      for(let i=0;i<=1;i++)
      {
        for(let j=0;j<=1;j++)
        {
      this.SharedAsset.push(r.desc[i].receivers[j])
        }
      }
      //console.log(this.SharedAsset)

     
     }) 
  }

  receive():void{
    //dev2
    this.http.get("http://3.7.32.15:8000/trans/received/").subscribe(res => {
      let r = JSON.parse(JSON.stringify(res))
      //console.log(r.meta.otpReferId)
      console.log(res)
      // this.EmployeeList=r.desc
      this.EmployeeList=r.desc
      console.log("hi"+this.EmployeeList)
      this.a=r.desc
      for(var i of this.a)
      {
        console.log(i.assetid)
        this.asse.push(i.assetid)
        this.from.push(i.from)
        this.exp.push(i.expiry)
      }
      //console.log(this.asse)
      
     
     }) 
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
  
 
  
  //npm install file-saver --force
  //npm install @types/file-saver --save-dev
  
  
  
  
  
  
  
  }
  