import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    /*if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.signIn({ email, password }).subscribe(
        response => {
          alert(response.message);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/landing']);
        },
        error => {
          alert(error.error.message);
        }
      );
    } else {
      console.log('Formular ist ungültig');
    }*/
  }
}
