import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVedioComponent } from './edit-vedio.component';

describe('EditVedioComponent', () => {
  let component: EditVedioComponent;
  let fixture: ComponentFixture<EditVedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVedioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
