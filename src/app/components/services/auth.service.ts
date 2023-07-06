import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, throwError, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

	private authorization: String = `/oauth/oauth/token`;
	private urlBase: String = `http://localhost:8765`;

	constructor(private http: HttpClient, private router: Router) {
		// if (this.hasToken()) {
		// 	this.setLoggedIn(true);
		// } else {
		// 	this.setLoggedIn(false);
		// }
	}

	public sign(payload: { email: string; password: string }): Observable<any> {
		console.log("send login to service")
		const headers = {
			'Authorization': "Basic QVBJX05BTUVfQUNDRVNTOkFQSV9TRUNSRVRfQUNDRVNT",
			"Content-Type": "application/x-www-form-urlencoded",
		};
		const Params = new URLSearchParams();
		Params.set('grant_type', 'password');
		Params.set('username', payload.email);
		Params.set('password', payload.password);

		return this.http.post<{ access_token: string, expires_in: string, jti: string, token_type: string }>(`${this.urlBase}${this.authorization}`, Params.toString(), { headers }).pipe(
			map((res) => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('token');
				localStorage.setItem('access_token', res.access_token);
				localStorage.setItem('token', res.access_token);

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

	public logout() {
		localStorage.removeItem('access_token');
		return this.router.navigate(['']);
	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('access_token');

		if (!token) return false;

		const jwtHelper = new JwtHelperService();
		return !jwtHelper.isTokenExpired(token);
	}


	// loggenIn$ = new BehaviorSubject(false);

	// hasToken(): boolean {
	// 	//chack user has a token
	// 	if (localStorage.getItem('token')) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	// setLoggedIn(value: boolean) {
	// 	//update loggedin status in loggedIn$ stream. 
	// 	this.loggenIn$.next(value);
	// }



}
