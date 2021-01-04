import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUserService} from '../auth-user.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthUserService,
              private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(responseData => {
      console.log(responseData);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      userDara => {
        console.log(userDara);
        this.authService.googleLogin(userDara).subscribe(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
      }, reason => {
        console.log(reason);
      }
    );
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
      console.log(userData);
      this.authService.fbLogin(userData).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    }, reason => {
      console.log(reason);
      }
    );
  }

}
