import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVisitaComponent } from './editar-visita.component';

describe('EditarVisitaComponent', () => {
  let component: EditarVisitaComponent;
  let fixture: ComponentFixture<EditarVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
