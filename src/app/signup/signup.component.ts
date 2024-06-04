import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      company: [{ value: 'FH Technikum Wien', disabled: true }],
      address: [''],
      city: [''],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, address, city, postalCode } = this.signupForm.getRawValue();
      this.http.post<any>('http://localhost:3000/users', { email, password, address, city, postalCode }).subscribe(
        response => {
          console.log(response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/landing']);
        },
        error => {
          console.log(error.error.message);
        }
      );
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
