import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageServiceService } from '../page-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService, private http: HttpClient) { }

  registerForm: FormGroup;
  imagePreview: string;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        area: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        image: ['', Validators.required],
        fileSource: ['', Validators.required],

        state: [''],
        city: [''],
        // image: ['']
    },);
}

validateNumber (event: KeyboardEvent) {
  const key = event.keyCode;
  if(key > 31 && (key < 48 || key > 57)){
    return false;
  }
  return true;
}

// onImagePicked(event: Event) {
//   const file = (event.target as HTMLInputElement).files[0];
//   this.registerForm.patchValue({image: file});
//   this.registerForm.get('image').updateValueAndValidity();
//   console.log(file);
//   console.log(this.registerForm);
//   const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result as string;
//     };
//     reader.readAsDataURL(file);
  
  
// }

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }


onFileChange(event) {
  
  if (event.target.files.length > 0) {
    const image = event.target.files[0];
    this.registerForm.patchValue({
      fileSource: image
    });
  }
}
   
onSubmit(){
  const formData = new FormData();
  formData.append('image', this.registerForm.get('fileSource').value);
  formData.append('name', this.registerForm.get('name').value);
  formData.append('area', this.registerForm.get('area').value);

  formData.append('phone', this.registerForm.get('phone').value);
  formData.append('password', this.registerForm.get('password').value);
  formData.append('state', this.registerForm.get('state').value);

  formData.append('city', this.registerForm.get('city').value);
  console.log(formData);

  this.http.put('http://clientapps.webhopers.com:3333/api/app/user', formData)
    .subscribe(res => {
      console.log(res);
      alert('Uploaded Successfully.');
    })
}

// onSubmit() {
//   const formData = {
//     name: this.registerForm.value.name,
//     area: this.registerForm.value.area,
//     phone: this.registerForm.value.phone,
//     password: this.registerForm.value.password,
//     // image: this.registerForm.value.image,
//     state: this.registerForm.value.state,
//     city: this.registerForm.value.city

//   }

// alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
// this.pageService.put('user', formData).subscribe((response) => {
//   console.log("in service", response);
//   if(response.status === 200){
//     console.log("successfully posted");
//   }else{
//     console.log("warning");
//   }
// }, (error) => {
//    console.log("something wrong");
// })
// }



}
