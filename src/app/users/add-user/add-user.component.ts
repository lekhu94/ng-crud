import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SWALMIXIN } from 'src/app/services/mixin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  isEdit: boolean = false;
  isSubmit: boolean = false;
  form: FormGroup;
  userId: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.userId = this.activeRouter.snapshot.paramMap.get('id');
    if (this.userId) this.getUser(this.userId);
  }

  getUser(id: any) {
    this.isEdit = true;
    this.service.getProfile(id).subscribe((data: any) => {
      this.form.patchValue(data.data[0]);
      this.form.get('email')?.disable();
    })
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmit = true;
    if(this.userId) this.updateUser(this.userId);
    else this.addUser();
  }

  addUser() {
    this.service.addUser(this.form.value).subscribe((data: any) => {
      SWALMIXIN.fire({
        icon: data.code == 200 ? 'success' : 'error',
        title: data.message,
      })
      this.isSubmit = false;
      if (data.code == 200) this.router.navigate(['/users']);
    }, error => {
      this.isSubmit = false;
      SWALMIXIN.fire({
        icon: 'error',
        title: error.message,
      })
    })
  }

  updateUser(id: number) {
    delete this.form.value.password;
    this.service.updateUser(id, this.form.value).subscribe((data: any) => {
      SWALMIXIN.fire({
        icon: data.code == 200 ? 'success' : 'error',
        title: data.message,
      })
      this.isSubmit = false;
      if (data.code == 200) this.router.navigate(['/users'])
    }, error => {
      this.isSubmit = false;
      SWALMIXIN.fire({
        icon: 'error',
        title: error.message,
      })
    })
  }

}
