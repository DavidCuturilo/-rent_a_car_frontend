import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OstecenjaPageComponent } from './ostecenja-page.component';

describe('OstecenjaPageComponent', () => {
  let component: OstecenjaPageComponent;
  let fixture: ComponentFixture<OstecenjaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OstecenjaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OstecenjaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
