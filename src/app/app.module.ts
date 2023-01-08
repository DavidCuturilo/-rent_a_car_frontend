import { EnvServiceProvider } from './../env/env.service.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { MaterialModule } from './material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdresaPageComponent } from './adresa-page/adresa-page.component';
import { AdresaComponent } from './adresa-page/adresa/adresa.component';
import { GradComponent } from './adresa-page/grad/grad.component';
import { AdresaCardComponent } from './adresa-page/adresa/adresa-card/adresa-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AdresaPageComponent,
    AdresaComponent,
    GradComponent,
    AdresaCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    EnvServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
