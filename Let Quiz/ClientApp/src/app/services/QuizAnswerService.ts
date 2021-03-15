import { Result } from './../models/result';
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

    addResult(quizAnswer: QuizAnswer, token: string) : Observable<Result> {

        return this.http.post<Result>(this.urlBase, quizAnswer, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}