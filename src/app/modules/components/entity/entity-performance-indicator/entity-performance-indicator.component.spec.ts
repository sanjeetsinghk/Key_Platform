import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPerformanceIndicatorComponent } from './entity-performance-indicator.component';

describe('EntityPerformanceIndicatorComponent', () => {
  let component: EntityPerformanceIndicatorComponent;
  let fixture: ComponentFixture<EntityPerformanceIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityPerformanceIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityPerformanceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
