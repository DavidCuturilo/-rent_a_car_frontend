import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-vozilo-page',
  templateUrl: './vozilo-page.component.html',
  styleUrls: ['./vozilo-page.component.scss'],
})
export class VoziloPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  vozila: any;
  vozilaCopy: typeof this.vozila;
  searchValue: string = '';
  public columnsSchema: any[];
  public displayedColumns: string[];
  vozilaResetSearch

  async ngOnInit() {
    await this.getVozila();
    if (this.vozila) {
      this.columnsSchema = [
        {
          key: 'registarski_broj',
          type: 'text',
          label: 'Registarski broj',
        },
        {
          key: 'model',
          type: 'text',
          label: 'Model',
        },
        {
          key: 'marka',
          type: 'text',
          label: 'Marka',
        },
        {
          key: 'jacina_motora',
          type: 'text',
          label: 'Jacina motora',
        },
        {
          key: 'tip_goriva',
          type: 'text',
          label: 'Tip goriva',
        },
        {
          key: 'kilometraza',
          type: 'text',
          label: 'Predjeni kilometri',
        },
        {
          key: 'datumistekaregistracije',
          type: 'text',
          label: 'Datum isteka registracije',
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
    this.vozilaResetSearch = this.vozila;
    searchValue.trim();
    try {
      const response: any = await lastValueFrom(
        this.http.get(
          `${this.envService.apiURL}/communities/vozilaByMarka/${searchValue}`
        )
      );
      if (response?.response?.error) {
        this.openSnackBar(response.message);
      } else if (response.length == 0){
        this.openSnackBar('There is no vehicle with that brand! Try again')
      } else {
        this.vozila = Array.isArray(response) ? response : [response];
        this.openSnackBar(`Successfully searched vozila`);
      }
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  resetujPretragu() {
    this.vozila = this.vozilaResetSearch;
    this.searchValue = '';
  }

  async getVozila() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allVozilo`)
      );
      this.vozila = response;
      this.vozila.map((vozilo) => {
        vozilo.datumistekaregistracije = new Date(
          vozilo.datumistekaregistracije
        ).toLocaleString();
      });
    } catch (error) {
      console.log(error);
    }
  }

  dodajVozilo() {
    const vozilo = {
      registarski_broj: '',
      model: '',
      marka: '',
      pogon: '',
      tipGoriva: '',
      jacinaMotora: '',
      kilometraza: '',
      datumistekaregistracije: '',
      isEdit: true,
    };

    this.vozilaCopy = this.vozila;
    this.vozila = [vozilo as any, ...this.vozila];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.post(
          `${this.envService.apiURL}/communities/insertVozilo`,
          element
        )
      );
      if (response?.response?.error) {
        this.vozila.filter(
          (vozilo) => vozilo.registarski_broj != element.registarski_broj
        );
      } else {
        element.isEdit = !element.isEdit;
      }
      this.openSnackBar(`${response.message}`);
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  ponisti(element: any) {
    element.isEdit = !element.isEdit;
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.vozilaCopy = JSON.parse(JSON.stringify(element));
  }

  async obrisi(element: any) {
    this.vozila = this.vozila.filter(
      (vozilo) => vozilo.registarski_broj != element.registarski_broj
    );
  }
}
