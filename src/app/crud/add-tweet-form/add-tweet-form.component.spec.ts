import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTweetFormComponent } from './add-tweet-form.component';

describe('AddTweetFormComponent', () => {
  let component: AddTweetFormComponent;
  let fixture: ComponentFixture<AddTweetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTweetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTweetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
