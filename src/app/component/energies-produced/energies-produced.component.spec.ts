import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiesProducedComponent } from './energies-produced.component';

describe('EnergiesProducedComponent', () => {
  let component: EnergiesProducedComponent;
  let fixture: ComponentFixture<EnergiesProducedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergiesProducedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergiesProducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
