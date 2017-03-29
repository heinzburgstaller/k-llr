import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAnonComponent } from './choose-anon.component';

describe('ChooseAnonComponent', () => {
  let component: ChooseAnonComponent;
  let fixture: ComponentFixture<ChooseAnonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAnonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
