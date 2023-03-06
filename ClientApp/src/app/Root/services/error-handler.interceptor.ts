import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = this.handleError(error);
          return throwError(() => new Error(errorMessage));
        }));
  }

  private handleError(error: HttpErrorResponse): string {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;

    } else {
      // server-side error

      switch (error.status) {
        case 400:
          // Bad request
          return this.handleBadRequest(error);
          break;
        case 401:
          // Unauthorized
          this.router.navigate(["/auth/login"]);
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not found
            return this.handleNotFound(error);
          break;
        case 500:
          // Internal server error
          break;
        default:
          // Something went wrong
          break;
      }


    }
    return errorMessage;
  }

  private handleNotFound(error: HttpErrorResponse): string {
    this.router.navigate(["/404"]);
    return error.message;
  }

  private handleBadRequest(error: HttpErrorResponse): string {
    console.log("bad request");
    if(this.router.url === "/auth/register") {
      let message = "";
      const values = Object.values(error.error.errors) as string[];

      values.map((value: string, index: number, array: string[]) => {
        return message += value + '</br>';
      });
      return message.slice(0, -4);

    } else {
      return error.error ? error.error : error.message;
    }
  }

}
