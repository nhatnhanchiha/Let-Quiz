import { PagingQuiz } from './../models/PagingQuiz';
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

    getQuizzes(token: string, searchValue: string, currentPage: number, maxRecord: number) : Observable<PagingQuiz> {
        return this.http.get<PagingQuiz>(`${this.url}?SearchValue=${searchValue}&CurrentPage=${currentPage}&MaxRecord=${maxRecord}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    getQuiz(id : number) {
        const token = sessionStorage.getItem('token');
        return this.http.get<Quiz>(this.url + '/student/quiz/' + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    changePage(token: string, url: string) : Observable<PagingQuiz> {
        return this.http.get<PagingQuiz>(url, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}
