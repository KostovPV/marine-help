// import {
//     HTTP_INTERCEPTORS,
//     HttpEvent,
//     HttpHandler,
//     HttpHeaders,
//     HttpInterceptor,
//     HttpParams,
//     HttpRequest,
//   } from '@angular/common/http';
//   import { Injectable, Provider } from '@angular/core';
//   import { Router } from '@angular/router';
//   import { Observable, catchError } from 'rxjs';
  
//   import { ErrorService } from './core/error/error.service';
  
//   const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/'
  
//   @Injectable()
//   export class AppInterceptor implements HttpInterceptor {
//     constructor(private router: Router, private errorServie: ErrorService) {}
  
//     intercept(
//       req: HttpRequest<any>,
//       next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//       if (req.url.startsWith('/api')) {
//         req = req.clone({
//           url: req.url.replace('/api', apiUrl)
          
//         });
//       }
  
//       return next.handle(req).pipe(
//         catchError((err) => {
//           if (err.status === 401) {
//             this.router.navigate(['/auth']);
//           } else {
//             this.errorServie.setError(err);
//             this.router.navigate(['/error']);
//           }
  
//           return [err];
//         })
//       );
//     }
//   }
  
//   export const appInterceptorProvider: Provider = {
//     multi: true,
//     useClass: AppInterceptor,
//     provide: HTTP_INTERCEPTORS,
//   };

import { Injectable, Provider } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';



@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user?.token as any)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
  export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS,
  };