import { PonudaPageComponent } from './ponuda-page/ponuda-page.component';
import { AdresaPageComponent } from './adresa-page/adresa-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'adresa-page', component: AdresaPageComponent },
  { path: 'ponuda-page', component: PonudaPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
