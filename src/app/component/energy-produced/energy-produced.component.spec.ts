import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyProducedComponent } from './energy-produced.component';

describe('EnergyProducedComponent', () => {
  let component: EnergyProducedComponent;
  let fixture: ComponentFixture<EnergyProducedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyProducedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyProducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
