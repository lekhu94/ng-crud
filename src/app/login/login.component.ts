import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SWALMIXIN } from '../services/mixin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmit: boolean = false;
  form: FormGroup;
  ngUser: any;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmit = true;
    this.service.login(this.form.value).subscribe((data: any) => {
      SWALMIXIN.fire({
        icon: data.code == 200 ? 'success' : 'error',
        title: data.message,
      })
      this.isSubmit = false;
      if (data.code == 200) {
        localStorage.setItem('ngUser', JSON.stringify(data.user[0]));
        this.dataService.setLogin(true);
        this.router.navigateByUrl('/users');
      }
    }, error => {
      this.isSubmit = false;
      SWALMIXIN.fire({
        icon: 'error',
        title: error.message,
      })
    })
  }

}
