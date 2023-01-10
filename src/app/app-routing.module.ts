import { UslugaPageComponent } from './usluga-page/usluga-page.component';
import { OstecenjaPageComponent } from './ostecenja-page/ostecenja-page.component';
import { UgovorPageComponent } from './ugovor-page/ugovor-page.component';
import { RacunPageComponent } from './racun-page/racun-page.component';
import { VoziloPageComponent } from './vozilo-page/vozilo-page.component';
import { PonudaPageComponent } from './ponuda-page/ponuda-page.component';
import { AdresaPageComponent } from './adresa-page/adresa-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'adresa-page', component: AdresaPageComponent },
  { path: 'ponuda-page', component: PonudaPageComponent },
  { path: 'vozilo-page', component: VoziloPageComponent },
  { path: 'racun-page', component: RacunPageComponent },
  { path: 'ugovor-page', component: UgovorPageComponent },
  { path: 'ostecenja-page', component: OstecenjaPageComponent },
  { path: 'usluga-page', component: UslugaPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
