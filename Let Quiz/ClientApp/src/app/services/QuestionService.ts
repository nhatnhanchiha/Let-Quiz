import { Observable } from 'rxjs';
import { Question } from './../models/Question';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class QuestionService {

    urlBase = "https://localhost:44300/api/questions";

    constructor(private http: HttpClient) {}

    getQuestionsByQuizID(quizID: string, token: string) : Observable<Question[]> {

        return this.http.get<Question[]>(this.urlBase + "?quizID=" + quizID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}