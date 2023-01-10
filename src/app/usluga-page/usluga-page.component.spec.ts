import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugaPageComponent } from './usluga-page.component';

describe('UslugaPageComponent', () => {
  let component: UslugaPageComponent;
  let fixture: ComponentFixture<UslugaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UslugaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UslugaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
