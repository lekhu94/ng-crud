import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    private login = new BehaviorSubject<boolean>(false);

    setLogin(islogin: boolean) {
        this.login.next(islogin);
    }

    isLogedin() {
        return this.login.asObservable();
    }

    constructor() { }

}