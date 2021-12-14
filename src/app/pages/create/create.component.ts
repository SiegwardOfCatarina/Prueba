import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup  = this.fb.group({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    userId: new FormControl(0, Validators.required)
  });
  constructor(private fb: FormBuilder,
    private postService: PostsService) { }

  ngOnInit(): void {
  }

  save(){
    if(this.form.valid){
      const data = this.form.getRawValue();
      this.postService.createPost(data).subscribe(response =>{
        console.log(response);
      });
    }
  }

  clear(){
    this.form.reset();
  }
}
