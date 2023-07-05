import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  loginUser(){
  	//execute your post rquest and set token in local storage or session storage or cokie storage
    //The token may be aby string. here i'm use my_token as the token.
  	localStorage.setItem('token', 'my_token');

  	this.router.navigate(['dashboard']);
  }

}
