import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PeriodicElement } from 'src/app/model/periodicElement';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { TodoService } from '../services/todo.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { Task } from 'src/app/model/task';

export interface TodoElement {
  name: string;
  position: number;
  item: any;
  select: boolean;
}

const ELEMENT_DATA: TodoElement[] = [
  { name: "asdasd", item: "", position:  1, select: false },
  { name: "asdasd", item: "", position:  1, select: false }
];

@Component({
  templateUrl: 'task-list.component.html',
})
export class TaskListComponent implements OnInit  {
  //dataSource: Element[] | undefined;
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator; 

  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<TodoElement>(true, []);
  todoId:any = null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log("opa task");
    // this.dataSource.paginator = this.paginator;
    //this.dataSource = ELEMENT_DATA;

    this.todoId = this.route.snapshot.params['id'];
    console.log(this.todoId);


    this.todoService.getTaskOfUser(this.todoId).subscribe({
      next: (res) => {
        console.log("get todo ***********");
        console.log(res);

        let todoList = []; 
        for (const element of res.content) {
          console.log(element); 
          todoList.push({ position: todoList.length, name: element.title, item: element });
        }

        // this.dataSource = todoList;
      },
      error: (e) => e,
    })

  }

  
  addNewTask(){
    console.log(" addNewTask ------------------- ");
    console.log("opa task");
    // this.dataSource.paginator = this.paginator;
    //this.dataSource = ELEMENT_DATA;
    console.log(this.todoId);
    return this.router.navigate(['taks/creat/'+this.todoId]);
  }


  goTodo(element: any){
    console.log(element)
    console.log(element.item.id)
    this.router.navigate(['taks/'+element.item.id]);

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TodoElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
