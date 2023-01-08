import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaPageComponent } from './adresa-page.component';

describe('AdresaPageComponent', () => {
  let component: AdresaPageComponent;
  let fixture: ComponentFixture<AdresaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
