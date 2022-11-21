import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateComponent } from './ultimate.component';

describe('UltimateComponent', () => {
  let component: UltimateComponent;
  let fixture: ComponentFixture<UltimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
