import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeDetailsComponent } from './entity-type-details.component';

describe('EntityTypeDetailsComponent', () => {
  let component: EntityTypeDetailsComponent;
  let fixture: ComponentFixture<EntityTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
