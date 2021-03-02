import { Observable } from 'rxjs';
import { QuizAnswer } from './../models/QuizAnswer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class QuizAnswerService {

    urlBase = "https://localhost:44300/api/results";

    constructor(private http: HttpClient) { }

    addResult(quizAnswer: QuizAnswer, token: string) : Observable<QuizAnswer> {

        return this.http.post<QuizAnswer>(this.urlBase, quizAnswer, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}