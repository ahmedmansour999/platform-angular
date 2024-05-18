import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppComponent } from './show-app.component';

describe('ShowAppComponent', () => {
  let component: ShowAppComponent;
  let fixture: ComponentFixture<ShowAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
