import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFiltersComponent } from './business-filters.component';

describe('BusinessFiltersComponent', () => {
  let component: BusinessFiltersComponent;
  let fixture: ComponentFixture<BusinessFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
