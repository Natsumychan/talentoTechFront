import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConsumedComponent } from './energy-consumed.component';

describe('EnergyConsumedComponent', () => {
  let component: EnergyConsumedComponent;
  let fixture: ComponentFixture<EnergyConsumedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyConsumedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyConsumedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
