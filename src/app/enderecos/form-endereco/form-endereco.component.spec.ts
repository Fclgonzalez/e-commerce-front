import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnderecoComponent } from './form-endereco.component';

describe('FormEnderecoComponent', () => {
  let component: FormEnderecoComponent;
  let fixture: ComponentFixture<FormEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
