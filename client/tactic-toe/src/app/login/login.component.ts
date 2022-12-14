import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { APIClientService } from '../apiclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required, Validators.minLength(6)]]
  })

  loginSuccess = 'null';

  constructor(
    private authService : AuthService, 
    private router : Router, 
    private http : HttpClient,
    private fb : FormBuilder,
    private api : APIClientService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.login(this.loginForm.value.userEmail as string, this.loginForm.value.userPassword as string);
  }

  login(email: string, password: string) {
    this.authService.validate(email, password)
      .subscribe({
        next: (response) => {
          this.loginSuccess = 'success';
          this.authService.setUserInfo({'user' : response['data']});
          this.api.getAllAi();
          this.router.navigate(['yourai'])
        },
        error: error => {
          this.loginSuccess = 'error';
        }}
      )
  }

  checkLoggedIn() {
    this.http.get('/api/loggedin', {withCredentials: true}).subscribe(data => {})
  }

}
