import { Component, OnInit } from '@angular/core';
import { loginIconsList } from './loginIconsList';
import { SignInData } from 'src/app/models/Internal/SignInData';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
})
export class LoginLayoutComponent implements OnInit {

  isSignInMode: boolean = true;
  loginIconsList = loginIconsList;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  runAnimation(): void {
    const vector = document.querySelector('.vector') as HTMLElement;
    console.log(vector);

    if (vector) {
      vector.style.animation = 'none';
      setTimeout(() => {
        vector.style.animation = '';
        vector.style.animation = 'runAcross 2s ease-in-out forwards';
      }, 10);

      setTimeout(() => { }, 2000);
    }
  }

  switchMode() {
    this.isSignInMode = !this.isSignInMode;
  }

  onSignIn(signInData: SignInData) {


  }
}