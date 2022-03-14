import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPortalComponent } from './group-portal.component';

describe('GroupPortalComponent', () => {
  let component: GroupPortalComponent;
  let fixture: ComponentFixture<GroupPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
