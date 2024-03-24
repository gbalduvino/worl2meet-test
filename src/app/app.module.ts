import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatCardModule } from '@angular/material/card'

import { AppComponent } from './app.component'
import { HeroCardComponent } from './components/heroes/hero-card/hero-card.component'
import { HeroService } from './services/hero.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HeroesComponent } from './components/heroes/heroes.component'
import { HeroInterceptor } from './interceptors/hero/hero.interceptor'
import { AppRoutingModule } from './app.routes'
import { FormsModule } from '@angular/forms'
import { HeroCreateComponent } from './components/hero/hero-create/hero-create.component'

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroCardComponent, HeroCreateComponent],
  imports: [BrowserModule, HttpClientModule, MatCardModule, AppRoutingModule, FormsModule],
  providers: [HeroService, provideAnimationsAsync(), { provide: HTTP_INTERCEPTORS, useClass: HeroInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
