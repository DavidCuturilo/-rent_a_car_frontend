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
  gradovi: any = [];
  constructor(private http: HttpClient, private injector: Injector, private _snackBar: MatSnackBar) {}

  envService: EnvService = this.injector.get(EnvService);
  addingNew: boolean = false;
  addingNewGrad: boolean = false;
  naziviGradova = [];
  naziviDrzava = [];

  public novaAdresa: {
    ulica: string;
    broj: number;
    nazivGrada: string;
    nazivDrzave: string;
    adresaID?: number;
  };
  public noviGrad: {
    nazivGrada: string;
    nazivDrzave: string;
  };

  ngOnInit(): void {
    this.getAllAdrese();
    this.getAllGradovi();
    this.getAllDrzave();
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

  async getAllGradovi() {
    const response = await lastValueFrom(
      this.http.get(`${this.envService.apiURL}/communities/allGrad`)
    )
      .then((response: any) => {
        this.gradovi = response;
        response.forEach(grad => {
          console.log(grad.nazivGrada)
          this.naziviGradova.push(grad.nazivGrada)
        });
        console.log(this.gradovi)
      })
      .catch((error) => {
        console.log('Error getting addresses: ', error);
      });
  }

  getAllDrzave() {
    const response = lastValueFrom(
      this.http.get(`${this.envService.apiURL}/communities/allDrzava`)
    )
      .then((response: any) => {
        response.forEach(drzava => {
          this.naziviDrzava.push(drzava.nazivDrzave)
        });
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

  addNewGrad() {
    if (this.addingNewGrad) return;
    this.addingNewGrad = true;
    this.noviGrad = { nazivGrada: '', nazivDrzave: '' };
  }

  cancelNewGrad() {
    this.addingNewGrad = false;
    this.noviGrad = { nazivGrada: '', nazivDrzave: '' };
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

  async saveNewGrad() {
    try {
      const response: any = await lastValueFrom(
        this.http.post(
          `${this.envService.apiURL}/communities/insertGrad`,
          this.noviGrad
        )
      );
      this.addingNewGrad = false;
      this.noviGrad = {
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
