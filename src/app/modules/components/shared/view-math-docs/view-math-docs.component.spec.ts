import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMathDocsComponent } from './view-math-docs.component';

describe('ViewMathDocsComponent', () => {
  let component: ViewMathDocsComponent;
  let fixture: ComponentFixture<ViewMathDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMathDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMathDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
