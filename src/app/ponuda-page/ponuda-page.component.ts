import { lastValueFrom } from 'rxjs';
import { EnvService } from './../../services/env.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-ponuda-page',
  templateUrl: './ponuda-page.component.html',
  styleUrls: ['./ponuda-page.component.scss'],
})
export class PonudaPageComponent implements OnInit {
  zahtevi: any[];
  klijenti: any[];

  constructor(private http: HttpClient, private injector: Injector) {}

  envService: EnvService = this.injector.get(EnvService);

  ngOnInit() {
  }
}
