import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwayPage } from './mway.page';

describe('MwayPage', () => {
  let component: MwayPage;
  let fixture: ComponentFixture<MwayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
