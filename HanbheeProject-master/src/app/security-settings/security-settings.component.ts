import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators, FormBuilder,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css']
})
export class SecuritySettingsComponent  {
  urls=[]
  selectFiles(event:any)
  {
    if(event.target.files)
    {
      for(var i=0;i<=File.length+1;i++)
      {
        var reader=new FileReader()

        reader.readAsDataURL(event.target.files[i])

        reader.onload=(event:any)=>
        {
          
  
          this.urls.push(event.target.result as never)
        }
      }
    }
  }
}
