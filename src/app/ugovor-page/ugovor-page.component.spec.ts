import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgovorPageComponent } from './ugovor-page.component';

describe('UgovorPageComponent', () => {
  let component: UgovorPageComponent;
  let fixture: ComponentFixture<UgovorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UgovorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UgovorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
