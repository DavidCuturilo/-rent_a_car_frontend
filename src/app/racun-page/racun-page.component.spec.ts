import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacunPageComponent } from './racun-page.component';

describe('RacunPageComponent', () => {
  let component: RacunPageComponent;
  let fixture: ComponentFixture<RacunPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacunPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacunPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
