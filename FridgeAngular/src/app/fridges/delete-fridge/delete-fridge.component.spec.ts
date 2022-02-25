import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFridgeComponent } from './delete-fridge.component';

describe('DeleteFridgeComponent', () => {
  let component: DeleteFridgeComponent;
  let fixture: ComponentFixture<DeleteFridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
