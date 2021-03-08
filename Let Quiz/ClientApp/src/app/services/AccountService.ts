import {Account} from './../models/Account';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    urlAuthe = 'https://localhost:44300/api/authenticate/login';
    urlAccount = 'https://localhost:44300/api/accounts';

    private currentAccountSource = new ReplaySubject<Account>(1);
    currentAccount$ = this.currentAccountSource.asObservable();

    constructor(private http: HttpClient) {
    }

    getToken(account: Account): Observable<any> {
        return this.http.post(this.urlAuthe, account, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }),
            responseType: 'text'
        });
    }

    getAccount(userName: string, token: string): Observable<Account> {
        return this.http.get<Account>(this.urlAccount + '/' + userName, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    checkUserNameExist(userName: string): Observable<Account> {
        return this.http.get<Account>(this.urlAccount + '?Username=' + userName, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    register(account: Account): Observable<Account> {
        return this.http.post<Account>(this.urlAccount, account, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getProfile() {
        const token = sessionStorage.getItem('token');
        return this.http.get<Account>(this.urlAccount + '/student/profile', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    updateProfile(model: any) {
        const token = sessionStorage.getItem('token');
        return this.http.put<Account>(this.urlAccount + '/student/update-profile', model, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    setCurrentAccount(account: Account) {
        this.currentAccountSource.next(account);
    }
}
