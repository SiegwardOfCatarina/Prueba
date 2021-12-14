import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comments } from 'src/app/interfaces/comments';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { UserComments } from 'src/app/interfaces/user-comments';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  post: Post;
  user: User;
  comments: Comments[];
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const data = sessionStorage.getItem('post');
    const post = JSON.parse(atob(data!));
    this.post = post;
    this.postService.getDetail(post).subscribe(response =>{
      console.log(response);
      const convert = response as unknown;
      const aux: UserComments = convert as UserComments
      this.user = aux.user;
      this.comments = aux.comments;
    });
  }

  ngOnDestroy(): void {
      sessionStorage.clear();
  }
}
