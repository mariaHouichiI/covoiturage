import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemResComponent } from './dem-res.component';

describe('DemResComponent', () => {
  let component: DemResComponent;
  let fixture: ComponentFixture<DemResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemResComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
