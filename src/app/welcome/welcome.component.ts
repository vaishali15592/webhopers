import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PageServiceService } from '../page-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  token: string;

  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService) { }
  data = {};
  updateForm: FormGroup;
  toggle= false;
  headers: {};
  ngOnInit() {
     this.data = JSON.parse(localStorage.getItem('data'));
    //  this.header = JSON.parse(localStorage.getItem('token'));

    console.log("welcome",this.data);

    this.token = localStorage.getItem("token");
    this.headers = { "Authorization": `Bearer ${this.token}`}



      this.updateForm = this.formBuilder.group({
          name: [''],
          area: [''],
          image: [''],
          state: [''],
          city: [''],
          address: [''],
      },);
  }

  get f() { return this.updateForm.controls }

  update = () => {
  this.toggle = true;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.updateForm.patchValue({
        fileSource: image
      });
    }
  }

  onSubmit() {
      const formData = {
        name: this.updateForm.value.name,
        area: this.updateForm.value.area,
        image: this.updateForm.value.phone,
        state: this.updateForm.value.state,
        city: this.updateForm.value.city,
        address: this.updateForm.value.address,
      }
    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateForm.value));
    this.pageService.patch('user', formData, this.headers).subscribe((response) => {
      console.log("in service", response);
      if(response.status === true){
        console.log("successfully posted", response);
        this.toggle = false;
      }else{
        console.log("warning");
      }
    }, (error) => {
       console.log("something wrong");
    })
    }

}
