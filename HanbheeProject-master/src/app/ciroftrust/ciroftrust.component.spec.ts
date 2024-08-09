import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiroftrustComponent } from './ciroftrust.component';

describe('CiroftrustComponent', () => {
  let component: CiroftrustComponent;
  let fixture: ComponentFixture<CiroftrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiroftrustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiroftrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
