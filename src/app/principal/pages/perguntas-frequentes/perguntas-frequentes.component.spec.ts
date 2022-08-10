import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntasFrequentesComponent } from './perguntas-frequentes.component';

describe('PerguntasFrequentesComponent', () => {
  let component: PerguntasFrequentesComponent;
  let fixture: ComponentFixture<PerguntasFrequentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerguntasFrequentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntasFrequentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
