import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScategoriesComponent } from './index.component';



describe('ScategoriesComponent', () => {
  let component: ScategoriesComponent;
  let fixture: ComponentFixture<ScategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScategoriesComponent]
    });
    fixture = TestBed.createComponent(ScategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
