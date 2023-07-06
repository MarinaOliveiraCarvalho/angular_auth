import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, throwError, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { createTodo } from 'src/app/model/createTodo';
import { TodoList } from 'src/app/model/todoList';

@Injectable()
export class TodoService {

	private authorization: String = `/oauth/oauth/token`;
	private link_get_todo: String = `/core/todo/page?direction=ASC&linesPerPage=12&orderBy=title&page=0`;
	private link_create_todo: String = `/core/todo`;
	private urlBase: String = `http://localhost:8765`;
	
	// todoList: TodoList;

	constructor(private http: HttpClient, private router: Router) {
	}

	public getTodoOfUser(): Observable<any> {
		console.log("get todo service");
		//console.log(this.todoList);
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.get<TodoList>(`${this.urlBase}${this.link_get_todo}`,{ headers }).pipe(
			map((res) => {
				console.log("resposta get toto");
				console.log(res);

				return res;	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}


	public getAccessToken(): string {
		const token = localStorage.getItem('access_token');

		if (!token) return "";

		return token;
	}



	
	public createTodoOfUser(title : string): Observable<any> {
		console.log("post todo service");
		console.log(title);
		const body = { title: title };
		let token = this.getAccessToken();

		const headers = {
			'Authorization': "Bearer "+ token,
			'Content-Type': "application/json",
		};

		return this.http.post<any>(`${this.urlBase}${this.link_create_todo}`, body, { headers }).pipe(
			map((res) => {
				console.log("res creat get toto");
				console.log(res);

				return this.router.navigate(['dashboard']);	
			}),
			catchError((e) => {
				if (e.error.message) return throwError(() => e.error.message);
				return throwError(
					() =>
						'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
				);
			})
		);
	}
 


}