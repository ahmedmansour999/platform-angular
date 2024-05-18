import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLectureComponent } from './admin-lecture.component';

describe('AdminLectureComponent', () => {
  let component: AdminLectureComponent;
  let fixture: ComponentFixture<AdminLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
