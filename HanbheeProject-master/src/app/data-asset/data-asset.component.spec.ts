import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAssetComponent } from './data-asset.component';

describe('DataAssetComponent', () => {
  let component: DataAssetComponent;
  let fixture: ComponentFixture<DataAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
