import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API url
  public apiURL = 'http://localhost:3000'
  constructor() { }
}
