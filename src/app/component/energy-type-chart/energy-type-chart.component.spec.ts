import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyTypeChartComponent } from './energy-type-chart.component';

describe('EnergyTypeChartComponent', () => {
  let component: EnergyTypeChartComponent;
  let fixture: ComponentFixture<EnergyTypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyTypeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
