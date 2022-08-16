import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroImovelComponent } from './form-cadastro-imovel.component';

describe('FormCadastroImovelComponent', () => {
  let component: FormCadastroImovelComponent;
  let fixture: ComponentFixture<FormCadastroImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadastroImovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
