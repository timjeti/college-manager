import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifysubjectComponent } from './modifysubject.component';

describe('ModifysubjectComponent', () => {
  let component: ModifysubjectComponent;
  let fixture: ComponentFixture<ModifysubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifysubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifysubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
