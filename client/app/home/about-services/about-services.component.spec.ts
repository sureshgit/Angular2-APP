import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutServicesComponent } from './about-services.component';

describe('AboutServicesComponent', () => {
  let component: AboutServicesComponent;
  let fixture: ComponentFixture<AboutServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
