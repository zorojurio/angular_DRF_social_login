import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';
import {SocialUser} from 'angularx-social-login';

const baseUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  user = new BehaviorSubject<User>(null);
  socialUser: SocialUser;
  isSocailLogin: boolean;

  constructor(private http: HttpClient) {
  }

  private updateData(resData, username) {
    const token = resData.access || resData.access_token;
    // decode the token to read the username and expiration timestamp
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    const tokenExpires = new Date(tokenDecoded.exp * 1000);
    const user = new User(username, token, tokenExpires);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  login(username: string, password: string) {
    const credentials = {username: username, password: password};
    const url: string = baseUrl + 'api/token/';

    return this.http.post(url, credentials).pipe(tap(resData => {
      this.updateData(resData, username);
      this.isSocailLogin = false;
    }));
  }

  fbLogin(data): Observable<any> {
    const credentials = {'access_token': data.authToken};
    console.log(credentials);
    return this.http.post(baseUrl + 'rest-auth/facebook/', credentials).pipe(tap(resData => {
      this.updateData(resData, resData.user.username);
      this.isSocailLogin = true;
    }));
  }

  googleLogin(data): Observable<any> {
    const credentials = {'access_token': data.authToken};
    this.isSocailLogin = true;
    return this.http.post(baseUrl + 'rest-auth/google/', credentials).pipe(tap(resData => {
      this.updateData(resData, resData.user.username);
      this.isSocailLogin = true;
    }));
  }


  autoLogin(): void {
    const userData: {
      username: string, userToken: string, _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username, userData.userToken, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

}
