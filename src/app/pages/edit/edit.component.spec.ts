import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ EditComponent ],
      providers:[
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(PostsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check getPostData', () => {
      component.posts = [{body: '', id: 1, title: '', userId: 1}];
      expect(component.getPostData(1)).toBeUndefined();
  });

  it('should check getPostToEdit', () =>{
      spyOn(component.postService, 'getPosts').and.callThrough();
      component.getPostsToEdit();
      expect(component.postService.getPosts).toHaveBeenCalled();
  });

  it('should check edit', ()=>{
    let form = new FormGroup({
      id: new FormControl(1, Validators.required),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      userId: new FormControl(1, Validators.required)
    });
    component.form = form;
    expect(component.edit()).toBeUndefined();
  });
});
