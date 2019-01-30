import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedFarmsComponent } from './added-farms.component';

describe('AddedFarmsComponent', () => {
  let component: AddedFarmsComponent;
  let fixture: ComponentFixture<AddedFarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedFarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedFarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
