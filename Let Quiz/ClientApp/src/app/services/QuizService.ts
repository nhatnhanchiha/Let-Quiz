import { QuizPaging } from './../models/QuizPaging';
import { Quiz } from './../models/Quiz';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class QuizService {

    url = "https://localhost:44300/api/quizzes";

    constructor(private http: HttpClient) {}

    getQuizzes(token: string, searchValue:string, currentPage: number, maxRecord: number) : Observable<QuizPaging> {
        return this.http.get<QuizPaging>(`${this.url}?searchValue=${searchValue}&currentPage=${currentPage}&maxRecord=${maxRecord}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    changePage(token: string, urlPage: string) : Observable<QuizPaging> {
        return this.http.get<QuizPaging>(urlPage, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}