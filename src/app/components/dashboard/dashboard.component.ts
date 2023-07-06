import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { TodoList } from 'src/app/model/todoList';


export interface TodoElement {
  name: string;
  position: number;
  item: any;
  // weight: number;
  // symbol: string;
}

const ELEMENT_DATA: TodoElement[] = [];
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


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
    this.router.navigate(['taks/'+element.item.id]);

  }

}