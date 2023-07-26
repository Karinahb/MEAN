import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCanchaComponent } from './pago-cancha.component';

describe('PagoCanchaComponent', () => {
  let component: PagoCanchaComponent;
  let fixture: ComponentFixture<PagoCanchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoCanchaComponent]
    });
    fixture = TestBed.createComponent(PagoCanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
