import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Importez NO_ERRORS_SCHEMA depuis @angular/core

import { CreateCatComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateCatComponent;
  let fixture: ComponentFixture<CreateCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCatComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ajoutez NO_ERRORS_SCHEMA ici
    });
    fixture = TestBed.createComponent(CreateCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
