import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaPageComponent } from './ponuda-page.component';

describe('PonudaPageComponent', () => {
  let component: PonudaPageComponent;
  let fixture: ComponentFixture<PonudaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PonudaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
