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
  heroData: Hero[] = [{
    id: 1,
    name: 'Superman',
    realName: 'Clark Kent',
    description: 'Superman hero',
    image: 'https://m.media-amazon.com/images/M/MV5BZGRhOGQ4YTEtNjNiYy00YjQxLWFiOTItYzRlYzg5ZGQ5MDNmXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg'
  },
  {
    id: 2,
    name: 'Batman',
    realName: 'Bruce Wayne',
    description: 'Batman hero',
    image: 'data:image/jpeg;base64,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'
  },
  {
    id: 3,
    name: 'Spiderman',
    realName: 'Miles Morales',
    description: 'Spiderman hero',
    image: 'data:image/jpeg;base64,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'
  },
  {
    id: 4,
    name: 'Ironman',
    realName: 'Tony Stark',
    description: 'Ironman hero',
    image: 'data:image/jpeg;base64,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'
  }]

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request
    console.log('URL', url)
    if (method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.heroData}))
        .pipe(delay(500));
    }

    return next.handle(request)
  }
}
