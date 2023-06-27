import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: any = {};
  constructor(public commonService: CommonService, private _router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    let isLoggedIn = localStorage.getItem('loginStatus');
    if (isLoggedIn == 'true') {
      this._router.navigateByUrl('/');
    }
  }

  onLogin() {

    let Params = this.loginData;

    this.authService.login(Params)
      .subscribe((res: any) => {
        let currentUser = res
        localStorage.setItem('CurrentUser', JSON.stringify(currentUser));
        localStorage.setItem('loginStatus', 'true');
        localStorage.setItem('token', currentUser?.token);
        localStorage.setItem('role', currentUser?.role);
        this.commonService.showSuccessToast("You are successfully logged in.");
        this._router.navigateByUrl('/');
      }, (err: any) => {
        this.commonService.showErrorToast(err?.error?.message);
      });
  }

}
