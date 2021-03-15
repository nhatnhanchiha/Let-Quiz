import { Quiz } from './../../models/Quiz';
import { Result } from './../../models/result';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    templateUrl: './student-quiz-result.component.html'
})

export class StudentQuizResultComponent implements OnInit, OnDestroy {

    result: Result;
    quiz: Quiz;

    constructor() { }

    ngOnDestroy(): void {
        sessionStorage.removeItem("result");
        sessionStorage.removeItem("quiz");
    }

    ngOnInit() { 
        this.result = JSON.parse(sessionStorage.getItem("result"));
        this.quiz = JSON.parse(sessionStorage.getItem("quiz"));
    }
}