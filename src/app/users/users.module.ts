import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
    {
      path: '',
      component: UsersComponent,
      children: [
        {
            path: '',
            component: UserListComponent
        },
          {
              path: 'add',
              component: AddUserComponent
          },
          {
            path: 'edit/:id',
            component: AddUserComponent
        }
      ]
    }
];

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations:[
        UsersComponent,
        AddUserComponent,
        UserListComponent
    ],
})

export class UserModule { }