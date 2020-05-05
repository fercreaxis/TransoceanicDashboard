import { Router } from '@angular/router';
import { AuxiliarService } from './../../lib/auxiliar.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const misc: any = {
  sidebar_mini_active: true,
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/sistema',
    title: 'Inicio',
    type: 'link',
    icontype: 'design_app',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private toastr: ToastrService,
    public auxiliar: AuxiliarService,
    public router: Router
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    this.minimizeSidebar();
  }
  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  myFunc(event, menuitem) {
    event.preventDefault();
    event.stopPropagation();
    this.sleep(10);

      // menuitem.isCollapsed = !menuitem.isCollapsed;

      let element = event.target;
      while (
        element.getAttribute('data-toggle') !== 'collapse' &&
        element !== document.getElementsByTagName('html')[0]
      ) {
        element = element.parentNode;
      }
      element = element.parentNode.children[1];

      if (
        element.classList.contains('collapse') &&
        !element.classList.contains('show')
      ) {
        element.classList = 'before-collapsing';
        const style = element.scrollHeight;

        element.classList = 'collapsing';
        setTimeout(function () {
          element.setAttribute('style', 'height:' + style + 'px');
        }, 1);
        setTimeout(function () {
          element.classList = 'collapse show';
          element.removeAttribute('style');
        }, 350);
      } else {
        const style = element.scrollHeight;
        setTimeout(function () {
          element.setAttribute('style', 'height:' + (style + 20) + 'px');
        }, 3);
        setTimeout(function () {
          element.classList = 'collapsing';
        }, 3);
        setTimeout(function () {
          element.removeAttribute('style');
        }, 20);
        setTimeout(function () {
          element.classList = 'collapse';
        }, 400);
      }
  }
  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('sidebar-mini');
    misc.sidebar_mini_active = false;

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  showSidebarMessage(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-top-right',
      }
    );
  }

  logout() {
    this.auxiliar.logout();
    this.router.navigate(['/', 'pages', 'login']);
  }
}
