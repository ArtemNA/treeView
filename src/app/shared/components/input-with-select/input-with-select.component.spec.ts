import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithSelectComponent } from './input-with-select.component';

describe('InputWithSelectComponent', () => {
  let component: InputWithSelectComponent;
  let fixture: ComponentFixture<InputWithSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
