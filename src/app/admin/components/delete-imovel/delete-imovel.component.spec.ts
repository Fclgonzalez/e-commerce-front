import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImovelComponent } from './delete-imovel.component';

describe('DeleteImovelComponent', () => {
  let component: DeleteImovelComponent;
  let fixture: ComponentFixture<DeleteImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteImovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
