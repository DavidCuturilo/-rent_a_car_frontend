import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-ugovor-page',
  templateUrl: './ugovor-page.component.html',
  styleUrls: ['./ugovor-page.component.scss']
})
export class UgovorPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  ugovori: any;
  ugovoriCopy: typeof this.ugovori;
  public columnsSchema: any[];
  public displayedColumns: string[];

  public columnsSchemaBitnijiDelovi: any[];
  public displayedColumnsBitnijiDelovi: string[];

  public columnsSchemaDetalji: any[];
  public displayedColumnsDetalji: string[];

  imenaPrezimenaRadnika: string[] = [];
  brojeviRezervacije: number[] = [];
  ugovoriBitnijiDelovi = [];
  ugovoriDetalji = [];

  async ngOnInit() {
    await this.getUgovore();
    await this.getRadnike();
    await this.getRezervacije();
    await this.getBitnijiDeloviUgovora();
    await this.getDetaljiUgovora();

    console.log(this.imenaPrezimenaRadnika, this.brojeviRezervacije)
    if (this.ugovori) {
      this.columnsSchema = [
        {
          key: 'redniBrojUgovora',
          type: 'number',
          label: 'Redni broj ugovora',
        },
        {
          key: 'datumUnosa',
          type: 'text',
          label: 'Datum unosa',
        },
        {
          key: 'datumStampe',
          type: 'text',
          label: 'Datum stampe',
        },
        {
          key: 'iznosFransize',
          type: 'text',
          label: 'Iznos fransize',
        },
        {
          key: 'cenovnik',
          type: 'text',
          label: 'Cenovnik',
        },
        {
          key: 'obavestenje',
          type: 'text',
          label: 'Obavestenje',
        },
        {
          key: 'depozit',
          type: 'number',
          label: 'Depozit',
        },
        {
          key: 'imePrezimeRadnika',
          type: 'text',
          label: 'Ime i prezime radnika',
        },
        {
          key: 'brojRezervacije',
          type: 'text',
          label: 'Broj rezervacije',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumns = this.columnsSchema.map((col) => col.key);
    }

    if (this.ugovoriBitnijiDelovi) {
      this.columnsSchemaBitnijiDelovi = [
        {
          key: 'redniBrojUgovora',
          type: 'number',
          label: 'Redni broj ugovora',
        },
        {
          key: 'imePrezimeRadnika',
          type: 'text',
          label: 'Ime i prezime radnika',
        },
        {
          key: 'brojRezervacije',
          type: 'text',
          label: 'Broj rezervacije',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumnsBitnijiDelovi = this.columnsSchemaBitnijiDelovi.map((col) => col.key);
    }

    if (this.ugovoriDetalji) {
      this.columnsSchemaDetalji = [
        {
          key: 'datumUnosa',
          type: 'text',
          label: 'Datum unosa',
        },
        {
          key: 'datumStampe',
          type: 'text',
          label: 'Datum stampe',
        },
        {
          key: 'iznosFransize',
          type: 'text',
          label: 'Iznos fransize',
        },
        {
          key: 'cenovnik',
          type: 'text',
          label: 'Cenovnik',
        },
        {
          key: 'obavestenje',
          type: 'text',
          label: 'Obavestenje',
        },
        {
          key: 'depozit',
          type: 'number',
          label: 'Depozit',
        },
        {
          key: 'isEdit',
          type: 'isEdit',
          label: '',
        },
      ];

      this.displayedColumnsDetalji = this.columnsSchemaDetalji.map((col) => col.key);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 4000,
      verticalPosition: 'top',
    });
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

  async getUgovore() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allUgovor`)
      );
      this.ugovori = response;
      this.ugovori.map((ugovor) => {
          (ugovor.datumStampe = new Date(ugovor.datumStampe).toLocaleString()),
          (ugovor.datumUnosa = new Date(ugovor.datumUnosa).toLocaleString());
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getBitnijiDeloviUgovora() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allBitnijiDeloviUgovora`)
      );
      this.ugovoriBitnijiDelovi = response;
      this.ugovoriBitnijiDelovi.map((ugovor) => {
          (ugovor.datumStampe = new Date(ugovor.datumStampe).toLocaleString()),
          (ugovor.datumUnosa = new Date(ugovor.datumUnosa).toLocaleString());
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getDetaljiUgovora() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allDetaljiUgovora`)
      );
      this.ugovoriDetalji = response;
      this.ugovoriDetalji.map((ugovor) => {
          (ugovor.datumStampe = new Date(ugovor.datumStampe).toLocaleString()),
          (ugovor.datumUnosa = new Date(ugovor.datumUnosa).toLocaleString());
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRezervacije() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRezervacija`)
      );
      response.forEach(rezervacija => {
        this.brojeviRezervacije.push(rezervacija.brojRezervacije);
      });

    } catch (error) {
      console.log(error);
    }
  }

  dodajUgovor() {
    const ugovor = {
      redniBrojUgovora: 0,
      datumUnosa: '',
      datumStampe: '',
      iznosFransize: '',
      obavestenje: '',
      cenovnik: '',
      depozit: 0,
      imePrezimeRadnika: '',
      brojRezervacije: '',
      isEdit: true,
    };

    this.ugovoriCopy = this.ugovori;
    this.ugovori = [ugovor as any, ...this.ugovori];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateUgovorById`,
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

  ponisti(element: any) {
    let empty = true;
    for (const key in element) {
      if (element[key]) {
        empty = true;
      }
    }
    if (empty) {
      this.ugovori = this.ugovori.filter((ugovor) => ugovor.ugovorID != element.ugovorID);
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.ugovoriCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
    if (!element.ugovorID) {
      this.ugovori = this.ugovori.filter(
        (ugovor) => ugovor.ugovorID != element.ugovorID
      );
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.delete(
            `${this.envService.apiURL}/communities/deleteUgovorById/${element.ugovorID}`
          )
        );
        this.openSnackBar(`${response.message}`);
        if (!response?.response?.error) {
          this.ugovori = this.ugovori.filter(
            (ugovor) => ugovor.ugovorID != element.ugovorID
          );
          this.ngOnInit();
        }
      } catch (error) {
        this.openSnackBar(`Error while deleting ugovor ${error}`);
      }
    }
  }
}
