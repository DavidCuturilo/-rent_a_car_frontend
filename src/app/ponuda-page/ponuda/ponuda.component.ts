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

  async ngOnInit() {
    await this.getPonude();
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
          type: 'text',
          label: 'Datum unosa',
        },
        {
          key: 'datumStampe',
          type: 'text',
          label: 'Datum stampe',
        },
        {
          key: 'datumIsteka',
          type: 'text',
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

  async getPonude() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allPonuda`)
      );
      this.ponude = response;
      this.ponude.map((ponuda) => {
        (ponuda.datumUnosa = new Date(ponuda.datumUnosa).toLocaleString()),
          (ponuda.datumStampe = new Date(ponuda.datumStampe).toLocaleString()),
          (ponuda.datumIsteka = new Date(ponuda.datumIsteka).toLocaleString());
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
    element.isEdit = !element.isEdit;
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.ponudaCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
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
      this.openSnackBar(`Error whilw deleting ponuda ${error}`);
    }
  }
}
