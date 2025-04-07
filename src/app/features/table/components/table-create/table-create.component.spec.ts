import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreateComponent } from './table-create.component';

describe('TableCreateComponent', () => {
  let component: TableCreateComponent;
  let fixture: ComponentFixture<TableCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
