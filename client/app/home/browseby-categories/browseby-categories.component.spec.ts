import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsebyCategoriesComponent } from './browseby-categories.component';

describe('BrowsebyCategoriesComponent', () => {
  let component: BrowsebyCategoriesComponent;
  let fixture: ComponentFixture<BrowsebyCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsebyCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsebyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
