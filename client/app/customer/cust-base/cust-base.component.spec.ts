import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBaseComponent } from './cust-base.component';

describe('CustBaseComponent', () => {
  let component: CustBaseComponent;
  let fixture: ComponentFixture<CustBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
