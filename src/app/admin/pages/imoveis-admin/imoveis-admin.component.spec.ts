import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisAdminComponent } from './imoveis-admin.component';

describe('ImoveisAdminComponent', () => {
  let component: ImoveisAdminComponent;
  let fixture: ComponentFixture<ImoveisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImoveisAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImoveisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
