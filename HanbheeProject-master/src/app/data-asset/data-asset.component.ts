import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
@Component({
  selector: 'app-data-asset',
  templateUrl: './data-asset.component.html',
  styleUrls: ['./data-asset.component.css']
})
export class DataAssetComponent  {
public showModal1:boolean=false
  constructor(private http:HttpClient) { }
//   afuConfig = {
//     multiple: true,
//     uploadAPI: {
//       url:"https://3acq841az6.execute-api.ap-south-1.amazonaws.com/dev/upload",
    
//     },
    
    
//     replaceTexts: {
//       selectFileBtn: 'Select Asset To Upload',
//       resetBtn: 'Reset',
//       uploadBtn: 'Upload Asset',
//       attachPinBtn: 'Attach Assets',
//       afterUploadMsg_success: 'Successfully Uploaded The Asset !',
//       afterUploadMsg_error: 'Upload Failed !',
//       sizeLimit: ''
//     }
    
// };

afuConfig: AngularFileUploaderConfig = {
  multiple: false,
  formatsAllowed: ".jpg, .jpeg, .png, .gif",
  // maxSize: 0.5,
  uploadAPI: {
    url:"http://3.7.32.15:8000/upload/",

    params: {
      image: "1"
    }
    // headers:{
    //'Authorization': this.token,

    // }
  },

  theme: "attachPin",
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  replaceTexts: {
    selectFileBtn: "Select Files",
    resetBtn: "Reset",
    uploadBtn: "Upload",
    dragNDropBox: "Drag N Drop",
    attachPinBtn: "Attach Files...",
    afterUploadMsg_success: "Successfully Uploaded !",
    afterUploadMsg_error: "Upload Failed !",
    sizeLimit: "Size Limit"
  }
};

DocUpload(event: any) {
  console.log("DocUpload event: ", event);
}

  

}
