import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaCardComponent } from './adresa-card.component';

describe('AdresaCardComponent', () => {
  let component: AdresaCardComponent;
  let fixture: ComponentFixture<AdresaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
