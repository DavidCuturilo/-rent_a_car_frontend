import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-racun-page',
  templateUrl: './racun-page.component.html',
  styleUrls: ['./racun-page.component.scss']
})
export class RacunPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  racuni: any;
  racuniCopy: typeof this.racuni;
  public columnsSchema: any[];
  public displayedColumns: string[];
  imenaPrezimena: string[] = [];
  racuniTekuceGodine;
  racuniIzPrethodneGodine;
  racuniRanijihGodina;
  vrstaPlacanja = ['Gotovina', 'Kartica', 'Odlozeno plazanje']

  async ngOnInit() {
    await this.getRacune();
    await this.getRadnike();
    await this.getRacuneTekuceGodine();
    await this.getRacunePrethodneGodine();
    await this.getRacuneRanijihGodina();
    if (this.racuni) {
      this.columnsSchema = [
        {
          key: 'brojRacuna',
          type: 'number',
          label: 'Broj racuna',
        },
        {
          key: 'datumIzdavanja',
          type: 'date',
          label: 'Datum izdavanja',
        },
        {
          key: 'datumPrometa',
          type: 'date',
          label: 'Datum prometa',
        },
        {
          key: 'datumStampe',
          type: 'date',
          label: 'Datum stampe',
        },
        {
          key: 'datumDospeca',
          type: 'date',
          label: 'Datum dospeca',
        },
        {
          key: 'vrstaPlacanja',
          type: 'text',
          label: 'Vrsta placanja',
        },
        {
          key: 'imePrezimeRadnika',
          type: 'text',
          label: 'Ime i prezime radnika',
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

  async getRadnike() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRadnik`)
      );
      if (!response?.response?.error) {
        response.forEach(radnik => {
          this.imenaPrezimena.push(radnik.imePrezimeRadnika);
        });
      }
    } catch (error) {

    }
  }

  async getRacune() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRacun`)
      );
      this.racuni = response;
      this.racuni.map((racun) => {
        (racun.datumIzdavanja = new Date(racun.datumIzdavanja).toISOString().split('T')[0]),
          (racun.datumStampe = new Date(racun.datumStampe).toISOString().split('T')[0]),
          (racun.datumPrometa = new Date(racun.datumPrometa).toISOString().split('T')[0]),
          (racun.datumDospeca = new Date(racun.datumDospeca).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRacuneTekuceGodine() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRacunTekuceGodine`)
      );
      this.racuniTekuceGodine = response;
      this.racuniTekuceGodine.map((racun) => {
        (racun.datumIzdavanja = new Date(racun.datumIzdavanja).toISOString().split('T')[0]),
          (racun.datumStampe = new Date(racun.datumStampe).toISOString().split('T')[0]),
          (racun.datumPrometa = new Date(racun.datumPrometa).toISOString().split('T')[0]),
          (racun.datumDospeca = new Date(racun.datumDospeca).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRacunePrethodneGodine() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRacunPrethodneGodine`)
      );
      this.racuniIzPrethodneGodine = response;
      this.racuniIzPrethodneGodine.map((racun) => {
        (racun.datumIzdavanja = new Date(racun.datumIzdavanja).toISOString().split('T')[0]),
          (racun.datumStampe = new Date(racun.datumStampe).toISOString().split('T')[0]),
          (racun.datumPrometa = new Date(racun.datumPrometa).toISOString().split('T')[0]),
          (racun.datumDospeca = new Date(racun.datumDospeca).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRacuneRanijihGodina() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allRacunRanijihGodina`)
      );
      this.racuniRanijihGodina = response;
      this.racuniRanijihGodina.map((racun) => {
        (racun.datumIzdavanja = new Date(racun.datumIzdavanja).toISOString().split('T')[0]),
          (racun.datumStampe = new Date(racun.datumStampe).toISOString().split('T')[0]),
          (racun.datumPrometa = new Date(racun.datumPrometa).toISOString().split('T')[0]),
          (racun.datumDospeca = new Date(racun.datumDospeca).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  dodajRacun() {
    const racun = {
      brojRacuna: 0,
      datumIzdavanja: '',
      datumPrometa: '',
      datumStampe: '',
      datumDospeca: '',
      vrstaPlacanja: '',
      imePrezimeRadnika: '',
      isEdit: true,
    };

    this.racuniCopy = this.racuni;
    this.racuni = [racun as any, ...this.racuni];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateRacunById`,
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
      if (element[key] && key != 'isEdit') {
        empty = false;
      }
    }
    if (empty) {
      this.racuni = this.racuni.filter((racun) => racun.racunID != element.racunID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.racuniCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
    if (!element.racunID) {
      this.racuni = this.racuni.filter(
        (racun) => racun.racunID != element.racunID
      );
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.delete(
            `${this.envService.apiURL}/communities/deleteRacunById/${element.racunID}`
          )
        );
        this.openSnackBar(`${response.message}`);
        if (!response?.response?.error) {
          this.racuni = this.racuni.filter(
            (racun) => racun.racunID != element.racunID
          );
          this.ngOnInit();
        }
      } catch (error) {
        this.openSnackBar(`Error while deleting racun ${error}`);
      }
    }
  }
}
