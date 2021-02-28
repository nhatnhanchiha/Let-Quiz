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

    getQuizzes(token: string) : Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.url, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}