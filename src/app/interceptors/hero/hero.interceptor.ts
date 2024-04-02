import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { Hero } from '../../models/hero.model'
import { LoaderService } from '../../services/loader.service'
import { tap } from 'rxjs'

@Injectable()
export class HeroInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const { url, method } = request
    if (method === 'GET') {
      const heroMatch = url.match('heroes/(.*)')
      const heroId = heroMatch?.[heroMatch.length - 1]
      const heroesData = JSON.parse(localStorage.getItem('heroes') || '[]')
      if (heroId) {
        return of(new HttpResponse({ status: 200, body: heroesData.find((hero: Hero) => hero.id === Number(heroId))}))
          .pipe(delay(500),tap(() => this.loaderService.hide()));
      } else {
        return of(new HttpResponse({ status: 200, body: heroesData}))
        .pipe(delay(500),tap(() => this.loaderService.hide()));
      }
    }

    if (method === 'POST') {
      const heroesData = JSON.parse(localStorage.getItem('heroes') || '')
      heroesData.push(request.body)
      localStorage.setItem('heroes', JSON.stringify(heroesData))
      return of(new HttpResponse({ status: 200, body: heroesData}))
        .pipe(delay(500),tap(() => this.loaderService.hide()));
    }

    if (method === 'PUT') {
      const heroesData = JSON.parse(localStorage.getItem('heroes') || '')
      const heroIndex = heroesData.findIndex((hero: Hero) => hero.id === request.body.id)
      heroesData[heroIndex] = request.body
      localStorage.setItem('heroes', JSON.stringify(heroesData))
      return of(new HttpResponse({ status: 200, body: heroesData}))
        .pipe(delay(500),tap(() => this.loaderService.hide()));
    }

    if (method === 'DELETE') {
      const heroesData = JSON.parse(localStorage.getItem('heroes') || '')
      const heroMatch = url.match('heroes/(.*)')
      const heroId = heroMatch?.[heroMatch.length - 1]
      const heroIndex = heroesData.findIndex((hero: Hero) => hero.id === Number(heroId))
      heroesData.splice(heroIndex, 1)
      localStorage.setItem('heroes', JSON.stringify(heroesData))
      return of(new HttpResponse({ status: 200, body: heroesData}))
        .pipe(delay(500),tap(() => this.loaderService.hide()));
    }

    return next.handle(request).pipe(
      tap(() => this.loaderService.hide())
    )
  }
}
