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

    getQuizzesForTeacher(token: string, searchValue: string, currentPage: number, maxRecord: number): Observable<PagingQuiz> {
        return this.http.get<PagingQuiz>(`${this.url}/GetQuizzesForTeacher?SearchValue=${searchValue}&CurrentPage=${currentPage}&MaxRecord=${maxRecord}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    changePageForTeacher(token: string, url: string): Observable<PagingQuiz> {
        return this.http.get<PagingQuiz>(url, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    getOwnQuizzes(token: string): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.url + "/teacher/own-quizzes", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    getQuizDetail(quizID: number, token: string): Observable<Quiz> {
        return this.http.get<Quiz>(this.url + "/teacher/" + quizID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    changePassword(quizID: string, password: string, token: string) {
        return this.http.put(this.url + "/change-password/" + quizID + "/" + password, null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    openQuiz(quizID: string, token: string) {
        return this.http.put(this.url + "/re-open-quiz", quizID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    closeQuiz(quizID: number, token: string) {
        return this.http.put(this.url + "/close-quiz", quizID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }

    insertQuizzes(quiz: Quiz, token: string): Observable<Quiz> {
        return this.http.post<Quiz>(this.url + "/insert-quizzes", quiz, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}
