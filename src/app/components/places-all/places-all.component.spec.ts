import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesAllComponent } from './places-all.component';

describe('PlacesAllComponent', () => {
  let component: PlacesAllComponent;
  let fixture: ComponentFixture<PlacesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
