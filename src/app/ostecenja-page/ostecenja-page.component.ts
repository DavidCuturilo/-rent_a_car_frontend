import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-ostecenja-page',
  templateUrl: './ostecenja-page.component.html',
  styleUrls: ['./ostecenja-page.component.scss']
})
export class OstecenjaPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}

  envService: EnvService = this.injector.get(EnvService);

  ostecenja: any = [];
  ostecenjaCopy: typeof this.ostecenja;
  public columnsSchema: any[];
  public displayedColumns: string[];
  imenaPrezimena: string[] = [];
  brojeviUgovora = [];
  tipOstecenjaChoice = ['Ostecenja pre najma','Nova ostecenja tokom najma'];

  async ngOnInit() {
    await this.getRadnike();
    await this.getOstecenja();
    await this.getUgovore();

    if (this.ostecenja) {
      this.columnsSchema = [
        {
          key: 'tipOstecenja',
          type: 'text',
          label: 'Tip ostecenja',
        },
        {
          key: 'obavestenje',
          type: 'text',
          label: 'Obavestenje',
        },
        {
          key: 'redniBrojUgovora',
          type: 'text',
          label: 'Redni broj ugovora',
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

  async getUgovore() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allUgovor`)
      );
      if (!response?.response?.error) {
        response.forEach(ugovor => {
          this.brojeviUgovora.push(ugovor.redniBrojUgovora);
        });
      }
    } catch (error) {

    }
  }

  async getOstecenja() {
    try {
      const response: any = await lastValueFrom(
        this.http.get(`${this.envService.apiURL}/communities/allOstecenja`)
      );
      this.ostecenja = response;
    } catch (error) {
      console.log(error);
    }
  }

  dodajOstecenje() {
    const ostecenje = {
      tipOstecenja: "",
      obavestenje: "",
      redniBrojUgovora: "",
      imePrezimeRadnika: "",
      isEdit: true,
    };

    this.ostecenjaCopy = this.ostecenja;
    this.ostecenja = [ostecenje as any, ...this.ostecenja];
  }

  async sacuvaj(element: any) {
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateOstecenjeById`,
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
      this.ostecenja = this.ostecenja.filter((ostecenje) => ostecenje.ostecenjaID != element.ostecenjaID);
    } else {
      element.isEdit = !element.isEdit;
    }
  }

  izmeni(element: any) {
    element.isEdit = !element.isEdit;
    this.ostecenjaCopy = JSON.parse(JSON.stringify(element));
  }
}
