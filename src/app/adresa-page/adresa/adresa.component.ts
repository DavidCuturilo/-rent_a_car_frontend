import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-adresa',
  templateUrl: './adresa.component.html',
  styleUrls: ['./adresa.component.scss'],
})
export class AdresaComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}
  envService: EnvService = this.injector.get(EnvService);
  editMode: boolean = false;

  novaAdresa;
  gradovi = [];
  drzave = [];

  @Input() adresa: {
    ulica: string;
    broj: number;
    nazivGrada: string;
    nazivDrzave: string;
    adresaID: number;
  };

  ngOnInit(): void {
    this.getAllGradovi();
    this.getAllDrzave();
  }

  async deleteAddress() {
    this.novaAdresa = { ...this.adresa };
    console.log(this.novaAdresa.adresaID);
    try {
      const response: any = await lastValueFrom(
        this.http.delete(
          `${this.envService.apiURL}/communities/deleteAddressById/${this.adresa.adresaID}`
        )
      );
      this.openSnackBar(response.message);
      this.ngOnInit();
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  getAllGradovi() {
    const response = lastValueFrom(
      this.http.get(`${this.envService.apiURL}/communities/allGrad`)
    )
      .then((response: any) => {
        response.forEach(grad => {
          if (!this.gradovi.find((g)=> g.nazivGrada == grad.nazivGrada)) {
            this.gradovi.push(grad.nazivGrada);
          }
        });
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
          this.drzave.push(drzava.nazivDrzave);
        });
      })
      .catch((error) => {
        console.log('Error getting addresses: ', error);
      });
  }

  cancelEdit() {
    this.editMode = false;
    this.adresa = this.novaAdresa;
  }

  editAddress() {
    if (this.editMode) return;
    this.novaAdresa = { ...this.adresa };
    this.editMode = true;
  }

  async updateAddress() {
    this.novaAdresa = { ...this.adresa };
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateAddressById`,
          this.novaAdresa
        )
      );
      console.log(response);
      this.openSnackBar(response.message);
      this.editMode = false;
      this.ngOnInit();
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
