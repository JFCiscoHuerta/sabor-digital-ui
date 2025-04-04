import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterCreateComponent } from './waiter-create.component';

describe('WaiterCreateComponent', () => {
  let component: WaiterCreateComponent;
  let fixture: ComponentFixture<WaiterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiterCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
