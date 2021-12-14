import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  datasource: MatTableDataSource<Post>= new MatTableDataSource();
  displayedColumns: string[] = ['id', 'title', 'userId'];
  userIds: number[] = [];
  expandedElement: Post | null = null;
  dataToFilter: Post[]= [];
  filteredData: Post[]=[];
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  constructor(public postService: PostsService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

 
  getPosts(){
    this.postService.getPosts().subscribe(element => {
      this.dataToFilter = element;
      this.datasource = new MatTableDataSource<Post>(element);
      this.detectChangesAndRefreshPaginator();
       element.forEach(post =>{
        this.userIds.push(post.userId);
      });
      this.userIds =[...new Set(this.userIds)];
    });
  }

  sortDataByUser(id: number){

    if(+id === 0){
      this.datasource = new MatTableDataSource<Post>(this.dataToFilter);
      this.detectChangesAndRefreshPaginator();
    }else{
      let aux = [...this.dataToFilter];
      this.filteredData = aux.filter((elem) => elem.userId === +id);
      this.datasource = new MatTableDataSource<Post>(this.filteredData); 
      this,this.detectChangesAndRefreshPaginator();
    }
  }

  detectChangesAndRefreshPaginator(){
    this.cdr.detectChanges();
    this.datasource.paginator = this.paginator;
  }

  details(post: Post){

    const aux = JSON.stringify(post);
    const encode = btoa(aux);
    sessionStorage.setItem('post', encode);
    this.router.navigate(['/details']);
  }
}
