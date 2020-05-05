import { Router } from '@angular/router';
import { AuxiliarService } from './../../../lib/auxiliar.service';
import { Login } from './../../../models/login.model';
import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public focus;
  public focus2;

  codigo = '';
  pin = '';

  loading = false;

  constructor(public auxiliar: AuxiliarService,
    public router: Router) {

      if (isDevMode()) {
        auxiliar.currentApi = auxiliar.devApi;
        auxiliar.currentToken = 'DevTOLoginData';
      } else {
        auxiliar.currentApi = auxiliar.serverApi;
        auxiliar.currentToken = 'TOLoginData';
      }
    }

  ngOnInit() {
    const $page = document.getElementsByClassName('full-page')[0];
    let image_src;
    const image_container = document.createElement('div');
    image_container.classList.add('full-page-background');
    image_container.style.backgroundImage = 'url(assets/img/bg14.jpg)';
    $page.appendChild(image_container);
    $page.classList.add('login-page');

  }
  ngOnDestroy() {
    const $page = document.getElementsByClassName('full-page')[0];
    $page.classList.remove('login-page');
  }

  login() {
    const param = new Login();

    param.username = this.codigo;
    param.password = this.pin;

    this.auxiliar.validarLogin(param)
    .subscribe(results =>  {
      this.loading = false;
      const retorno: Login = results;
      retorno.username = this.codigo;
      if (this.auxiliar.inicializarLogin(retorno)) {
        this.router.navigateByUrl('/dashboard');
      }

    }, error => {
      this.auxiliar.msgErrorDB('Error', error);
    }
    );
  }
}
