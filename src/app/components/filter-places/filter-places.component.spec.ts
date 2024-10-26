import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlacesComponent } from './filter-places.component';

describe('FilterPlacesComponent', () => {
  let component: FilterPlacesComponent;
  let fixture: ComponentFixture<FilterPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
