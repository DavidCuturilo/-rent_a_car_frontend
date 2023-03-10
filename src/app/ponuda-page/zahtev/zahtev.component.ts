import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-zahtev',
  templateUrl: './zahtev.component.html',
  styleUrls: ['./zahtev.component.scss'],
})
export class ZahtevComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  zahtevi: any;
  zahtevCopy: typeof this.zahtevi;
  public columnsSchema: any[];
  public displayedColumns: string[];
  imenaPrezimenaKlijenata = [];
  imenaPrezimenaRadnika = [];
  odobren = ['Odobren', 'Nije odobren'];

  async ngOnInit() {
    await this.getzahtevi();
    await this.getKlijente();
    await this.getRadnike();
    if (this.zahtevi) {
      this.columnsSchema = [
        {
          key: 'naslov',
          type: 'text',
          label: 'Naslov',
        },
        {
          key: 'sadrzaj',
          type: 'text',
          label: 'Sadrzaj',
        },
        {
          key: 'datumOd',
          type: 'date',
          label: 'Datum od',
        },
        {
          key: 'datumDo',
          type: 'date',
          label: 'Datum do',
        },
        {
          key: 'odobren',
          type: '',
          label: 'Odobren',
        },
        {
          key: 'imePrezimeRadnika',
          type: 'text',
          label: 'Ime i prezime radnika',
        },
        {
          key: 'imePrezimeKlijenta',
          type: 'text',
          label: 'Ime i prezime klijenta',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumns = this.columnsSchema.map((col) => col.key);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }

  async getzahtevi() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allZahtev`)
      );
      this.zahtevi = response;
      this.zahtevi.map((zahtev) => {
          (zahtev.odobren = zahtev.odobren ? 'Odobren' : 'Nije odobren'),
          (zahtev.datumOd = new Date(zahtev.datumOd).toISOString().split('T')[0]),
          (zahtev.datumDo = new Date(zahtev.datumDo).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  dodajZahtev() {
    const zahtev = {
      naslov: '',
      sadrzaj: '',
      datumOd: '',
      datumDo: '',
      odobren: '',
      imePrezimeRadnika: '',
      imePrezimeKlijenta: '',
      isEdit: true,
    };

    this.zahtevCopy = this.zahtevi;
    this.zahtevi = [zahtev as any, ...this.zahtevi];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateZahtevById`,
          element
        )
      );
      this.openSnackBar(`${response.message}`);
      element.isEdit = !element.isEdit;
    } catch (error) {
      console.log(`Error while updating zahtev ${error}`);
    }
  }

  ponisti(element: any) {
    let empty = true;
    for (const key in element) {
      if (element[key] && key != 'isEdit') {
        empty = false;
      }
    }
    if (empty) {
      this.zahtevi = this.zahtevi.filter((zahtev) => zahtev.zahtevID != element.zahtevID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.zahtevCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
    if (!element.zahtevID) {
      this.zahtevi = this.zahtevi.filter(
        (zahtev) => zahtev.zahtevID != element.zahtevID
      );
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.delete(
            `${this.envService.apiURL}/communities/deleteZahtevById/${element.zahtevID}`
          )
        );
        if (!response?.response?.error) {
          this.zahtevi = this.zahtevi.filter(
            (zahtev) => zahtev.zahtevID != element.zahtevID
          );
        }
        this.openSnackBar(`${response.message}`);
      } catch (error) {
        this.openSnackBar(`Error while deleting zahtev ${error}`);
      }
    }
  }

  async getRadnike() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRadnik`)
      );
      if (!response?.response?.error) {
        response.forEach(radnik => {
          this.imenaPrezimenaRadnika.push(radnik.imePrezimeRadnika);
        });
      }
    } catch (error) {

    }
  }

  async getKlijente() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allKlijent`)
      );
      if (!response?.response?.error) {
        response.forEach(klijent => {
          this.imenaPrezimenaKlijenata.push(klijent.imePrezimeKlijenta);
        });
      }
    } catch (error) {

    }
  }
}
