import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  activeUser: any;
  islogin: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.activeUser = localStorage.getItem('ngUser');
    this.activeUser = JSON.parse(this.activeUser);
    this.dataService.isLogedin().subscribe((res: any) => {
      this.islogin = res;
    });
    if (this.activeUser) this.islogin = true;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure!',
      text: 'Do you want to logout',
      icon: 'warning',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('ngUser');
        this.router.navigateByUrl('/');
        this.dataService.setLogin(false);
      }
    });
  }

}
