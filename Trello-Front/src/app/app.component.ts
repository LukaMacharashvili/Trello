import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingService } from './interceptors/loading.service';
import { LoginLogoutEmitterService } from './services/emitters/login-logout-emitter.service';
import { DeleteUserModComponent } from './view/delete-user-mod/delete-user-mod.component';
import { UpdateUserModComponent } from './view/update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'trello-front';
  panelOpenState = false;
  afterLoginDisplay: boolean = localStorage.getItem('jwt') ? true : false;
  searchValue: any;
  loader: boolean = false;

  constructor(
    private loginoutEmitter: LoginLogoutEmitterService,
    private dialog: MatDialog,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.setLoading();
    this.loginoutEmitter.loginlogoutEmitter.subscribe((response: boolean) => {
      this.afterLoginDisplay = response;
    });
  }

  setLoading() {
    this.loadingService.loadingEmitter.subscribe((response: any) => {
      this.loader = response;
    });
  }

  openDeleteUserModuleBtnClick() {
    this.dialog.open(DeleteUserModComponent);
  }

  openUpdateUserFormBtnClick() {
    this.dialog.open(UpdateUserModComponent);
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.loginoutEmitter.loginlogoutEmitter.emit(false);
    this.router.navigate(['login']);
  }
}
