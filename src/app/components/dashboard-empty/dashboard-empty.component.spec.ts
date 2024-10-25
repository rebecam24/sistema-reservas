import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmptyComponent } from './dashboard-empty.component';

describe('DashboardEmptyComponent', () => {
  let component: DashboardEmptyComponent;
  let fixture: ComponentFixture<DashboardEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
