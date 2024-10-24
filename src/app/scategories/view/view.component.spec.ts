import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCScatomponent } from './view.component';

describe('ViewCScatomponent', () => {
  let component: ViewCScatomponent;
  let fixture: ComponentFixture<ViewCScatomponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCScatomponent]
    });
    fixture = TestBed.createComponent(ViewCScatomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
