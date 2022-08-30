import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisitaComponent } from './edit-visita.component';

describe('EditVisitaComponent', () => {
  let component: EditVisitaComponent;
  let fixture: ComponentFixture<EditVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
