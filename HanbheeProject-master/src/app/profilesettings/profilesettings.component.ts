import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.css']
})
export class ProfilesettingsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  codepattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { 
    this.form=this.formBuilder.group({
      currentemail: new FormControl('',[Validators.required,Validators.email]),
      newemail: new FormControl('',[Validators.required,Validators.email]),
      reenteremail: new FormControl('',[Validators.required,Validators.email]),
      pwd1: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
      newpwd: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
      reenterpwd2: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
      pwd2: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
    }, {
      validator: this.mustMatch('newemail', 'reenteremail')  
       }
      );
      this.form1=this.formBuilder.group({
        pwd1: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
        newpwd: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
        reenterpwd2: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
        pwd2: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
      }, {
        validator:this.mustMatch('newpwd', 'reenterpwd2') 
        
         }
        );
        this.form2=this.formBuilder.group({
          pwd3: new FormControl('',[Validators.required,Validators.pattern(this.codepattern)]),
        }, 
          );
  }

  ngOnInit() {
   
      }
    get f()
    {
      return this.form.controls;
    }
    get f1()
    {
      return this.form1.controls;
    }
    get f2()
    {
      return this.form2.controls;
    }
  
    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
  
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
  
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }
}

