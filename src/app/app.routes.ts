import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HeroEditComponent } from './components/hero/hero-edit/hero-edit.component'
import { HeroCreateComponent } from './components/hero/hero-create/hero-create.component'
import { HeroesComponent } from './components/heroes/heroes.component'

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'hero/edit/:id', component: HeroEditComponent },
  { path: 'hero/create', component: HeroCreateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
