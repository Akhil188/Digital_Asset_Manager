import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAssetsComponent } from './data-assets.component';

describe('DataAssetsComponent', () => {
  let component: DataAssetsComponent;
  let fixture: ComponentFixture<DataAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
