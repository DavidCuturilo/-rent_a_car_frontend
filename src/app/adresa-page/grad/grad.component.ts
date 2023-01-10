import { HttpClient } from '@angular/common/http';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { EnvService } from 'src/services/env.service';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.scss']
})
export class GradComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private injector: Injector,
    private snackBar: MatSnackBar
  ) {}
  envService: EnvService = this.injector.get(EnvService);
  editMode: boolean = false;

  noviGrad;
  drzave = [];

  @Input() grad: {
    nazivGrada: string;
    nazivDrzave: string;
    gradID: number;
  };

  ngOnInit(): void {
    this.getAllDrzave();
  }

  async deleteGrad() {
    this.noviGrad = { ...this.grad };
    console.log(this.noviGrad.gradID);
    try {
      const response: any = await lastValueFrom(
        this.http.delete(
          `${this.envService.apiURL}/communities/deleteGradById/${this.grad.gradID}`
        )
      );
      this.openSnackBar(response.message);
      this.ngOnInit();
    } catch (error) {
      this.openSnackBar(error.message);
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.grad = this.noviGrad;
  }

  editGrad() {
    if (this.editMode) return;
    this.noviGrad = { ...this.grad };
    this.editMode = true;
  }

  async updateGrad() {
    this.noviGrad = { ...this.grad };
    try {
      const response: any = await lastValueFrom(
        this.http.put(
          `${this.envService.apiURL}/communities/updateGradById`,
          this.noviGrad
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

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
