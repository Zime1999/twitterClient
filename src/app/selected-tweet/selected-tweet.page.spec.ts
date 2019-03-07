import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTweetPage } from './selected-tweet.page';

describe('SelectedTweetPage', () => {
  let component: SelectedTweetPage;
  let fixture: ComponentFixture<SelectedTweetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTweetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTweetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
