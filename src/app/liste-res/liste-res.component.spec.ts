import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResComponent } from './liste-res.component';

describe('ListeResComponent', () => {
  let component: ListeResComponent;
  let fixture: ComponentFixture<ListeResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeResComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
