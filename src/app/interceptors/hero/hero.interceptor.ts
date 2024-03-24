// src/app/hero.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Hero } from '../../models/hero.model';

@Injectable()
export class HeroInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request
    console.log('URL', url, method)
    if (method === 'GET') {
      return of(new HttpResponse({ status: 200, body: JSON.parse(localStorage.getItem('heroes') || '')}))
        .pipe(delay(500));
    }

    console.log('Method', method)
    if (method === 'POST') {
      const heroesData = JSON.parse(localStorage.getItem('heroes') || '')
      heroesData.push(request.body)
      console.log('Heroes data', heroesData)
      localStorage.setItem('heroes', JSON.stringify(heroesData))
      return of(new HttpResponse({ status: 200, body: heroesData}))
        .pipe(delay(500));
    }

    return next.handle(request)
  }
}
