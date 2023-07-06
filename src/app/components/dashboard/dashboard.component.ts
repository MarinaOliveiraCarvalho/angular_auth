import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { TodoList } from 'src/app/model/todoList';


export interface TodoElement {
  name: string;
  position: number;
  item: any;
}

const ELEMENT_DATA: TodoElement[] = [];


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private todoService: TodoService,private router: Router) { }

  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;


  ngOnInit() {
    this.todoService.getTodoOfUser().subscribe({
      next: (res) => {
        console.log("get todo ***********");
        console.log(res);

        let todoList = []; 
        for (const element of res.content) {
          console.log(element); 
          todoList.push({ position: todoList.length, name: element.title, item: element });
        }

        this.dataSource = todoList;
      },
      error: (e) => e,
    })
  }


  onSubmit(){
    console.log(" onSubmit ------------------- ");

    return this.router.navigate(['todo']);

    // this.todoService.getTodoOfUser().subscribe({
    //   next: (res) => res,
    //   error: (e) => e,
    // })
  }

  goTodo(element: any){
    console.log(element)
    console.log(element.item.id)
    this.router.navigate(['taks/list/'+element.item.id]);
  }
}