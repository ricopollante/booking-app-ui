import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregivingComponent } from './caregiving.component';

describe('CaregivingComponent', () => {
  let component: CaregivingComponent;
  let fixture: ComponentFixture<CaregivingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaregivingComponent]
    });
    fixture = TestBed.createComponent(CaregivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
