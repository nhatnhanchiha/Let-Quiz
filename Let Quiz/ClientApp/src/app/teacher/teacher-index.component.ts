import { Quiz } from './../models/Quiz';
import { QuizService } from './../services/QuizService';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './teacher-index.component.html',
    styleUrls: ['./teacher-index.component.css']
})

export class TeacherIndexComponent implements OnInit {

    quizzes: Quiz[];
    account: Account = JSON.parse(sessionStorage.getItem('account'));
    
    constructor(private quizService: QuizService) { }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');

        this.quizService.getQuizzes(token).subscribe(
            (data: Quiz[]) => this.quizzes = data
        );
    }
}