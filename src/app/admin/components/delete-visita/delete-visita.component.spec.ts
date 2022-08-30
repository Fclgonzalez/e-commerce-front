import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVisitaComponent } from './delete-visita.component';

describe('DeleteVisitaComponent', () => {
  let component: DeleteVisitaComponent;
  let fixture: ComponentFixture<DeleteVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
