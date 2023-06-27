import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { BehaviorSubject } from 'rxjs';

const USER_MODULE = 'auth/';
@Injectable({
    providedIn: 'root'
})

@Injectable()

export class AuthService {
    public isUserLoggedIn: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public isProfile: BehaviorSubject<any> = new BehaviorSubject<any>({});
    constructor(public commonService: CommonService) { }

    login(data: any) {
        return this.commonService.postWithoutToken(USER_MODULE + 'login/', data);
    }
}

