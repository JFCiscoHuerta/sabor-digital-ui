import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterDetailsComponent } from './waiter-details.component';

describe('WaiterDetailsComponent', () => {
  let component: WaiterDetailsComponent;
  let fixture: ComponentFixture<WaiterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiterDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
