import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleBoardComponent } from './little-board.component';

describe('LittleBoardComponent', () => {
  let component: LittleBoardComponent;
  let fixture: ComponentFixture<LittleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LittleBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LittleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
