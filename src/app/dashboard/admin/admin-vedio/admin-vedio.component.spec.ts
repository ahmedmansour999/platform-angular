import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVedioComponent } from './admin-vedio.component';

describe('AdminVedioComponent', () => {
  let component: AdminVedioComponent;
  let fixture: ComponentFixture<AdminVedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVedioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
