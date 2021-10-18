import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SWALMIXIN } from 'src/app/services/mixin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;
  activeUser: any;
  isLoading: boolean = false;
  pageOffset: number = 5;
  role: string = '';
  searchText: string = '';

  constructor(
    private service: UserService
  ) { }

  @ViewChild('input', { static: true })
  input!: ElementRef;

  ngOnInit() {
    this.getUsers();
    this.activeUser = localStorage.getItem('ngUser');
    this.activeUser = JSON.parse(this.activeUser);
  }

  getUsers() {
    this.isLoading = true;
    this.service.getUsers(this.pageOffset, this.role, this.searchText).subscribe((res: any) => {
      setTimeout(() => {
        if (res.code != 200) return;
        this.isLoading = false;
        this.users = res.data;
      }, 800)
    })
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure!',
      text: 'Do you want to delete this user',
      icon: 'warning',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) this.delete(id);
    })
  }

  delete(id: number) {
    this.service.deleteUser(id).subscribe((res: any) => {
      SWALMIXIN.fire({
        icon: res.code == '200' ? 'success' : 'warning',
        title: res.message,
      });
      this.getUsers();
    })
  }

  onNavchange(offset: any) {
    this.pageOffset = offset.target.value;
    this.getUsers();
  }

  byRole(role: any) {
    this.role = role.target.value;
    this.getUsers();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          this.searchText = this.input.nativeElement.value;
          this.getUsers();
        })
      )
      .subscribe();
  }

  resetFilters() {
    this.role = '';
    this.input.nativeElement.value = '';
    this.searchText = '';
    this.getUsers();
  }

}


