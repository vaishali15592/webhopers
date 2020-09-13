import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageServiceService } from '../page-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  headers: {};
  token: string;
  

  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService) { 
    
  }
  changePwdForm: FormGroup;

  ngOnInit() {
    this.changePwdForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    })
    // this.headers = { 
    //   Authorization:  'Bearer ' + localStorage.getItem("token")
    // };
    this.token = localStorage.getItem("token");
    this.headers = { "Authorization": `Bearer ${this.token}`}
    // var headers = new Headers();
    // headers.append("Authorization", localStorage.getItem("token"));
    console.log(this.headers);
  }

  get f() { return this.changePwdForm.controls };




  onSubmit() {
    const formData = {
      oldPassword: this.changePwdForm.value.oldPassword,
      newPassword: this.changePwdForm.value.newPassword,
  
    }
  
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changePwdForm.value));
  this.pageService.patch('user/changePassword', formData, this.headers).subscribe((response) => {
    console.log("in login service", response);
    if(response.status === 200){
      console.log("successfully posted");
    }else{
      console.log("warning");
    }
  }, (error) => {
     console.log("something wrong");
  })
  }


}
