import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Post } from 'src/app/interfaces/post';
import { DetailsComponent } from '../details/details.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([{path: 'details', component: DetailsComponent}])],
      declarations: [ HomeComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sortDataByUser', ()=>{
    component.dataToFilter = [{id:1, body: '', title: '', userId: 1}];
    expect(component.sortDataByUser(1)).toBeUndefined();
  });

  it('should sortDataByUser', ()=>{
    component.dataToFilter = [{id:1, body: '', title: '', userId: 1}];
    expect(component.sortDataByUser(0)).toBeUndefined();
  });

  it('should check detail', () => {
    let post: Post = {
      id: 1,
      body: '',
      title: '',
      userId: 1
    }
    expect(component.details(post)).toBeUndefined();
  });
});
