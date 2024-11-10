import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNodeComponentComponent } from './entity-node-component.component';

describe('EntityNodeComponentComponent', () => {
  let component: EntityNodeComponentComponent;
  let fixture: ComponentFixture<EntityNodeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityNodeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityNodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
