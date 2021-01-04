import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthUserService} from './user/auth-user.service';
import {Subscription} from 'rxjs';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Customer';
  isLoggedIn = false;
  private userSubscription: Subscription;

  constructor(private authService: AuthUserService,
              private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    if (!this.authService.isSocailLogin) {
      this.userSubscription = this.authService.user.subscribe(
        user => {
          this.isLoggedIn = !!user;
          if (this.isLoggedIn) {
            console.log('user is logged in');
          }
        }
      );
    } else {
      this.userSubscription = this.socialAuthService.authState.subscribe(
        user => {
          this.isLoggedIn =  (user != null);
          console.log('working the rest user');
          if (this.isLoggedIn) {
            console.log('user is logged in');
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
