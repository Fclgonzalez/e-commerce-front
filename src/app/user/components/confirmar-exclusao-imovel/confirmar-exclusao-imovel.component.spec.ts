import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExclusaoImovelComponent } from './confirmar-exclusao-imovel.component';

describe('ConfirmarExclusaoImovelComponent', () => {
  let component: ConfirmarExclusaoImovelComponent;
  let fixture: ComponentFixture<ConfirmarExclusaoImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarExclusaoImovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarExclusaoImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
