import { EnvServiceProvider } from '../services/env.service.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { MaterialModule } from './material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdresaPageComponent } from './adresa-page/adresa-page.component';
import { AdresaComponent } from './adresa-page/adresa/adresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradComponent } from './adresa-page/grad/grad.component';
import { PonudaPageComponent } from './ponuda-page/ponuda-page.component';
import { PonudaComponent } from './ponuda-page/ponuda/ponuda.component';
import { ZahtevComponent } from './ponuda-page/zahtev/zahtev.component';
import { VoziloPageComponent } from './vozilo-page/vozilo-page.component';
import { RacunPageComponent } from './racun-page/racun-page.component';
import { UgovorPageComponent } from './ugovor-page/ugovor-page.component';
import { OstecenjaPageComponent } from './ostecenja-page/ostecenja-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AdresaPageComponent,
    AdresaComponent,
    GradComponent,
    PonudaPageComponent,
    PonudaComponent,
    ZahtevComponent,
    VoziloPageComponent,
    RacunPageComponent,
    UgovorPageComponent,
    OstecenjaPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    EnvServiceProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
