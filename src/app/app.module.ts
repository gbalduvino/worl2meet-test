import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatCardModule } from '@angular/material/card'

import { AppComponent } from './app.component'
import { HeroComponent } from './components/heroes/components/hero/hero.component'
import { HeroService } from './services/hero.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { HeroesComponent } from './components/heroes/heroes.component'

@NgModule({
  declarations: [AppComponent, HeroesComponent, HeroComponent],
  imports: [BrowserModule, HttpClientModule, MatCardModule],
  providers: [HeroService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
