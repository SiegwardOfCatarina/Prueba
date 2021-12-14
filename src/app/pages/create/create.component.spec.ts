import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CreateComponent ],
      providers:[
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check clear', () => {
    component.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
      userId: new FormControl(1)
    });
    expect(component.clear()).toBeUndefined();
  });

  it('should check', () => {
    component.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(),
      userId: new FormControl()
    });
    expect(component.save()).toBeUndefined();
  });
});
