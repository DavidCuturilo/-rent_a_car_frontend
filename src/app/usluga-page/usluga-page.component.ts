import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-usluga-page',
  templateUrl: './usluga-page.component.html',
  styleUrls: ['./usluga-page.component.scss']
})
export class UslugaPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  usluge: any;
  cene: any;

  uslugeCopy: typeof this.usluge;
  ceneCopy;

  naziviUsluga: string[] = [];

  public columnsSchema: any[];
  public displayedColumns: string[];

  public columnsSchemaCenaUsluge: any[];
  public displayedColumnsCenaUsluge: string[];

  async ngOnInit() {
    await this.getUsluge();
    await this.getCene();

    if (this.usluge) {
      this.columnsSchema = [
        {
          key: 'naziv',
          type: 'text',
          label: 'Naziv usluge',
        },
        {
          key: 'aktuelnaCena',
          type: 'number',
          label: 'Aktuelna cena',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumns = this.columnsSchema.map((col) => col.key);
    }

    if (this.cene) {
      this.columnsSchemaCenaUsluge = [
        {
          key: 'naziv',
          type: 'text',
          label: 'Naziv usluge',
        },
        {
          key: 'iznos',
          type: 'number',
          label: 'Iznos',
        },
        {
          key: 'datumOd',
          type: 'date',
          label: 'Datum pocetka vazenja cene',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumnsCenaUsluge = this.columnsSchemaCenaUsluge.map((col) => col.key);
    }
  }

  async getUsluge() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allUsluga`)
      );
      this.usluge = response;
      if (this.usluge) {
        console.log(this.usluge)
        this.usluge.forEach(usluga => {
          if (!this.naziviUsluga.find((naziv) => naziv == usluga.naziv)) {
            this.naziviUsluga.push(usluga.naziv);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCene() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allCena`)
      );
      this.cene = response;
      this.cene.map((cena) => {
        cena.datumOd = new Date(cena.datumOd).toISOString().split('T')[0]
      })
    } catch (error) {
      console.log(error);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }

  dodajUslugu() {
    const usluga = {
      naziv: '',
      aktuelnaCena: 0,
      isEdit: true,
    };

    this.uslugeCopy = this.usluge;
    this.usluge = [usluga as any, ...this.usluge];
  }

  dodajCenuUsluge() {
    const cena = {
      naziv: '',
      iznos: 0,
      datumOd: '',
      isEdit: true,
    };

    this.ceneCopy = this.cene;
    this.cene = [cena as any, ...this.cene];
  }

  async sacuvajUslugu(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateUsluguById`,
          element
        )
      );
      this.openSnackBar(`${response.message}`);
      element.isEdit = !element.isEdit;
      this.ngOnInit();
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  async sacuvajCenu(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateCenuById`,
          element
        )
      );
      this.openSnackBar(`${response.message}`);
      element.isEdit = !element.isEdit;
      this.ngOnInit();
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  ponistiUslugu(element: any) {
    let empty = true;
    for (const key in element) {
      if (element[key] && key != 'isEdit') {
        empty = false;
      }
    }
    if (empty) {
      this.usluge = this.usluge.filter((usluga) => usluga.vrstaUslugeID != element.vrstaUslugeID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  ponistiCenu(element: any) {
    let empty = true;
    for (const key in element) {
      if (element[key] && key != 'isEdit') {
        empty = false;
      }
    }
    if (empty) {
      this.cene = this.cene.filter((cena) => cena.cenaUslugeID != element.cenaUslugeID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
  }

  async obrisiUslugu(element: any) {
    if (!element.vrstaUslugeID) {
      this.usluge = this.usluge.filter(
        (usluga) => usluga.vrstaUslugeID != element.vrstaUslugeID
      );
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.delete(
            `${this.envService.apiURL}/communities/deleteUsluguById/${element.vrstaUslugeID}`
          )
        );
        this.openSnackBar(`${response.message}`);
        if (!response?.response?.error) {
          this.usluge = this.usluge.filter(
            (usluga) => usluga.vrstaUslugeID != element.vrstaUslugeID
          );
          this.ngOnInit();
        }
      } catch (error) {
        this.openSnackBar(`Error while deleting usluga ${error}`);
      }
    }
  }
}
