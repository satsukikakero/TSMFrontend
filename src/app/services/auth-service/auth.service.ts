import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router' 

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {

    }

    get isAuthenticated() {
        return !!localStorage.getItem('token')
    }

    register(credentials) {
        console.log(credentials)
        this.http.post<any>(`https://localhost:44334/api/account`, credentials).subscribe(res => {
            console.log(res);
            this.authenticate(res);
        })
    }

    login(credentials) {
        this.http.post<any>(`https://localhost:44334/api/account/login`, credentials).subscribe(res => {
            console.log(res);
            this.authenticate(res);
        })
    }

    authenticate(res) {
        localStorage.setItem('token', res);

        this.router.navigate(['/'])
    }

    logout() {
        localStorage.removeItem('token');
    }
}