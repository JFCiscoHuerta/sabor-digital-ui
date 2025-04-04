import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterCardComponent } from './waiter-card.component';

describe('WaiterCardComponent', () => {
  let component: WaiterCardComponent;
  let fixture: ComponentFixture<WaiterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
