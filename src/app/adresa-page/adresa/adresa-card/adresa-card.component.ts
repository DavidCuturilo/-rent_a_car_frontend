import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adresa-card',
  templateUrl: './adresa-card.component.html',
  styleUrls: ['./adresa-card.component.scss']
})
export class AdresaCardComponent implements OnInit {

  constructor() { }
  editMode: boolean = false;

  ngOnInit(): void {
  }

  deleteKlijent(){

  }
}
