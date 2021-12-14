import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup = this.fb.group({
    id: new FormControl({value:0,disabled: true}, Validators.required),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    userId: new FormControl({value:0, disabled: true}, Validators.required)
  });
  postsIds: number[] = [];
  posts: Post[] = [];
  constructor(private fb: FormBuilder, public postService: PostsService) { }
  
  ngOnInit(): void {
    this.getPostsToEdit();
  }
  getPostsToEdit(){
    this.postService.getPosts().subscribe(element => {
      this.posts = element;
      element.forEach(post => {
        this.postsIds.push(post.id);
      });
    });
  }
  edit(){
    if(this.form.valid && this.form.controls['id'].value !==0 && 
       this.form.controls['userId'].value !==0){
        const data = this.form.getRawValue();
        this.postService.editPost(data).subscribe(response => {
          console.log(response);
          this.form.reset();
        });
    }
  }

  getPostData(id: number){
    let auxPost = [...this.posts];
    auxPost = auxPost.filter(elem => elem.id === +id);
    this.form.get('id')?.setValue(auxPost[0].id);
    this.form.get('title')?.setValue(auxPost[0].title);
    this.form.get('body')?.setValue(auxPost[0].body);
    this.form.get('userId')?.setValue(auxPost[0].userId);

  }
}
