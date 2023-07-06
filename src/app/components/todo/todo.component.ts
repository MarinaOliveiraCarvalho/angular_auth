import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {

  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;


  constructor(private todoService: TodoService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.form = this.fb.group({
      todoName: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }


  onSubmit(){
    console.log("creat new todo");
    console.log(this.form.value.todoName)
    this.todoService.createTodoOfUser(this.form.value.todoName).subscribe({
      next: (res) => res,
      error: (e) => e,
    })
  }
}