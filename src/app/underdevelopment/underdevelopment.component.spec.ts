import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderdevelopmentComponent } from './underdevelopment.component';

describe('UnderdevelopmentComponent', () => {
  let component: UnderdevelopmentComponent;
  let fixture: ComponentFixture<UnderdevelopmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnderdevelopmentComponent]
    });
    fixture = TestBed.createComponent(UnderdevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
