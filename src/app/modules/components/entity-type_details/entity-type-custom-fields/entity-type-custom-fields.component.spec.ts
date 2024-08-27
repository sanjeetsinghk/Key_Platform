import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypeCustomFieldsComponent } from './entity-type-custom-fields.component';

describe('EntityTypeCustomFieldsComponent', () => {
  let component: EntityTypeCustomFieldsComponent;
  let fixture: ComponentFixture<EntityTypeCustomFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityTypeCustomFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityTypeCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
