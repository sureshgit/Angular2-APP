import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessResultBaseComponent } from './business-result-base.component';

describe('BusinessResultBaseComponent', () => {
  let component: BusinessResultBaseComponent;
  let fixture: ComponentFixture<BusinessResultBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessResultBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessResultBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
