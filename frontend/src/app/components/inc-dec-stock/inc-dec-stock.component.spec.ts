import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncDecStockComponent } from './inc-dec-stock.component';

describe('IncDecStockComponent', () => {
  let component: IncDecStockComponent;
  let fixture: ComponentFixture<IncDecStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncDecStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncDecStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
