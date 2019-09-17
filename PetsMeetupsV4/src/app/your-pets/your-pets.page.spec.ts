import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPetsPage } from './your-pets.page';

describe('YourPetsPage', () => {
  let component: YourPetsPage;
  let fixture: ComponentFixture<YourPetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourPetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
