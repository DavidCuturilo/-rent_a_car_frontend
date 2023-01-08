import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-adresa-page',
  templateUrl: './adresa-page.component.html',
  styleUrls: ['./adresa-page.component.scss'],
})
export class AdresaPageComponent implements OnInit {
  adrese: any = [];
  constructor(private http: HttpClient, private injector: Injector, private _snackBar: MatSnackBar) {}

  envService: EnvService = this.injector.get(EnvService);
  addingNew: boolean = false;
  public novaAdresa: {
    ulica: string;
    broj: number;
    nazivGrada: string;
    nazivDrzave: string;
    adresaID?: number;
  };

  ngOnInit(): void {
    this.getAllAdrese();
  }

  async getAllAdrese() {
    const response = await lastValueFrom(
      this.http.get(`${this.envService.apiURL}/communities/allAddress`)
    )
      .then((response) => {
        this.adrese = response;
      })
      .catch((error) => {
        console.log('Error getting addresses: ', error);
      });
  }

  addNewAddress() {
    if (this.addingNew) return;
    this.addingNew = true;
    this.novaAdresa = { ulica: '', broj: 0, nazivGrada: '', nazivDrzave: '' };
  }

  cancelNewAddress() {
    this.addingNew = false;
    this.novaAdresa = { ulica: '', broj: 0, nazivGrada: '', nazivDrzave: '' };
  }

  async saveNewAddress() {
    this.novaAdresa.broj = +this.novaAdresa.broj;
    try {
      const response: any = await lastValueFrom(
        this.http.post(
          `${this.envService.apiURL}/communities/insertAddress`,
          this.novaAdresa
        )
      );
      this.addingNew = false;
      this.novaAdresa = {
        ulica: '',
        broj: 0,
        nazivGrada: '',
        nazivDrzave: '',
      };
      this.ngOnInit();
      this.openSnackBar(response.message)
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
