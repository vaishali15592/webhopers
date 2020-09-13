import { Component, OnInit } from '@angular/core';
import { PageServiceService } from '../page-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService, public router: Router) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
  },);

  }
  get f() { return this.loginForm.controls; }

  validateNumber (event: KeyboardEvent) {
    const key = event.keyCode;
    if(key > 31 && (key < 48 || key > 57)){
      return false;
    }
    return true;
  }

  onSubmit() {
    const formData = {
      phone: this.loginForm.value.phone,
      password: this.loginForm.value.password,
  
    }
  
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
  this.pageService.post('user/login', formData).subscribe((response) => {
    console.log("in login service", response);
    if(response.success === true){
      console.log("successfully posted");
      localStorage.setItem("data", JSON.stringify(response.data.items[1]));
      localStorage.setItem("token", JSON.stringify(response.data.items[0]));
      this.router.navigate(['/welcome']);
    }else{
      console.log("warning");
    }
  }, (error) => {
     console.log("something wrong");
  })
  }

}
