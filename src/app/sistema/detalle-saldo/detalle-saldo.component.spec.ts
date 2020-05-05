import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSaldoComponent } from './detalle-saldo.component';

describe('DetalleSaldoComponent', () => {
  let component: DetalleSaldoComponent;
  let fixture: ComponentFixture<DetalleSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
