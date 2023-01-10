import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss'],
})
export class PonudaComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  ponude: any;
  ponudaCopy: typeof this.ponude;
  public columnsSchema: any[];
  public displayedColumns: string[];
  imenaPrezimenaRadnika = [];
  imenaPrezimenaKlijenata = [];
  nasloviZahteva = [];
  ponudeResetSearch
  searchValue = '';

  async ngOnInit() {
    await this.getPonude();
    await this.getKlijente();
    await this.getRadnike();
    await this.getNaslove();
    if (this.ponude) {
      this.columnsSchema = [
        {
          key: 'naslov',
          type: 'text',
          label: 'Naslov',
        },
        {
          key: 'broj',
          type: 'number',
          label: 'Broj',
        },
        {
          key: 'datumUnosa',
          type: 'date',
          label: 'Datum unosa',
        },
        {
          key: 'datumStampe',
          type: 'date',
          label: 'Datum stampe',
        },
        {
          key: 'datumIsteka',
          type: 'date',
          label: 'Datum isteka',
        },
        {
          key: 'iznosFransize',
          type: 'number',
          label: 'Iznos fransize',
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

  async pretrazi(searchValue: string) {
    this.ponudeResetSearch = this.ponude;
    const ponuda = this.ponude.find((ponuda) => ponuda.broj == searchValue);
    console.log(ponuda)
    if (!ponuda) {
      this.openSnackBar('There is no ponuda with that number! Try again')
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.get(
            `${this.envService.apiURL}/communities/ponudaByID/${ponuda.ponudaID}`
          )
        );
        if (response?.response?.error) {
          this.openSnackBar(response.message);
        } else {
          this.ponude = Array.isArray(response) ? response : [response];
          this.ponude.map((ponuda) => {
            (ponuda.datumUnosa = new Date(ponuda.datumUnosa).toISOString().split('T')[0]),
              (ponuda.datumStampe = new Date(ponuda.datumStampe).toISOString().split('T')[0]),
              (ponuda.datumIsteka = new Date(ponuda.datumIsteka).toISOString().split('T')[0]);
          });
          this.openSnackBar(`Successfully searched ponude`);
        }
      } catch (error) {
        this.openSnackBar(error.message);
      }
    }
  }

  resetujPretragu() {
    this.ponude = this.ponudeResetSearch;
    this.searchValue = '';
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

  async getNaslove() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allZahtev`)
      );
      if (!response?.response?.error) {
        response.forEach(zahtev => {
          this.nasloviZahteva.push(zahtev.naslov);
        });
      }
    } catch (error) {

    }
  }

  async getPonude() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allPonuda`)
      );
      this.ponude = response;
      this.ponude.map((ponuda) => {
        (ponuda.datumUnosa = new Date(ponuda.datumUnosa).toISOString().split('T')[0]),
          (ponuda.datumStampe = new Date(ponuda.datumStampe).toISOString().split('T')[0]),
          (ponuda.datumIsteka = new Date(ponuda.datumIsteka).toISOString().split('T')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  dodajPonudu() {
    const ponuda = {
      naslov: '',
      broj: 0,
      datumUnosa: '',
      datumStampe: '',
      datumIsteka: '',
      isnoFransize: 0,
      imePrezimeRadnika: '',
      imePrezimeKlijenta: '',
      isEdit: true,
    };

    this.ponudaCopy = this.ponude;
    this.ponude = [ponuda as any, ...this.ponude];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updatePonudaById`,
          element
        )
      );
      this.openSnackBar(`${response.message}`);
      element.isEdit = !element.isEdit;
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
      this.ponude = this.ponude.filter((ponuda) => ponuda.ponudaID != element.ponudaID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.ponudaCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
    if (!element.ponudaID) {
      this.ponude = this.ponude.filter(
        (ponuda) => ponuda.ponudaID != element.ponudaID
      );
    } else {
      try {
        const response: any = await lastValueFrom(
          this.http.delete(
            `${this.envService.apiURL}/communities/deletePonudaById/${element.ponudaID}`
          )
        );
        this.openSnackBar(`${response.message}`);
        if (!response?.response?.error) {
          this.ponude = this.ponude.filter(
            (ponuda) => ponuda.ponudaID != element.ponudaID
          );
        }
      } catch (error) {
        this.openSnackBar(`Error while deleting ponuda ${error}`);
      }
    }
  }
}
