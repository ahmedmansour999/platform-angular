import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseContentComponent } from './admin-course-content.component';

describe('AdminCourseContentComponent', () => {
  let component: AdminCourseContentComponent;
  let fixture: ComponentFixture<AdminCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
