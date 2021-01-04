import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthUserService} from './auth-user.service';
import {exhaustMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthUserInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthUserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(take(1),
      exhaustMap(
        user => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedRequest = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + user.token)
          });
          return next.handle(modifiedRequest);
        }
      )
    );
  }
}
