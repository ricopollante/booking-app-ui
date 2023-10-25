import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinfoComponent } from './profileinfo.component';

describe('ProfileinfoComponent', () => {
  let component: ProfileinfoComponent;
  let fixture: ComponentFixture<ProfileinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileinfoComponent]
    });
    fixture = TestBed.createComponent(ProfileinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
