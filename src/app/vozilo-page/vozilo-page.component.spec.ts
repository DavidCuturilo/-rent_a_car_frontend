import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoziloPageComponent } from './vozilo-page.component';

describe('VoziloPageComponent', () => {
  let component: VoziloPageComponent;
  let fixture: ComponentFixture<VoziloPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoziloPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoziloPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
