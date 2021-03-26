import { Result } from './../models/result';
import { Router } from '@angular/router';
import { QuizAnswerService } from './../services/QuizAnswerService';
import { Account } from './../models/Account';
import { QuizAnswer } from './../models/QuizAnswer';
import { AnswerSelect } from './../models/AnswerSelect';
import { Question } from './../models/Question';
import { QuestionService } from './../services/QuestionService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quiz } from '../models/Quiz';

@Component({
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit, OnDestroy {

    questions: Question[];
    quiz: Quiz;
    timeRemaining: string;
    private answerSelect: AnswerSelect[] = [];

    private interval;

    private startTimeStr: string;

    constructor(private questionService: QuestionService, private quizAnswerService: QuizAnswerService, private router: Router) { }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
        let quizID = sessionStorage.getItem("quizID");
        this.quiz = JSON.parse(sessionStorage.getItem("quiz"));

        if (quizID == null) {
            this.router.navigate(['student-index']);
        } else {
            this.questionService.getQuestionsByQuizID(quizID, token).subscribe(
                (data: Question[]) => {
                    this.questions = data;
                    this.questions.forEach(q => {
                        let ansSelect: AnswerSelect = {questionId: q.questionId, answerId: 0};
                        this.answerSelect.push(ansSelect);
                    })
                }
            );
    
            let today = new Date();
            this.startTimeStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
            this.countDown();
        }
    }

    countDown() {

        let timer = (this.quiz.duration * 60);

        this.interval = setInterval(() => {
            let minutes = Math.floor(timer / 60);
            let second = timer % 60;

            let minutesStr = minutes < 10 ? `0${minutes}` : minutes;
            let secondStr = second < 10 ? `0${second}` : second;

            this.timeRemaining = `${minutesStr}:${secondStr}`;

            if(--timer < 0) {
                this.onSubmit();
                clearInterval(this.interval);
            }
        }, 1000);
    }

    onSelectAnswer(quesID: number, ansID: number) {
        console.log("ques: "+quesID, "ans: "+ansID, typeof(quesID), typeof(ansID));

        let ansSelect = this.answerSelect.find(a => a.questionId === quesID);

        if(ansSelect != null) {
            ansSelect.answerId = ansID;
        }
    }

    onSubmit() {
        console.log("finish");
        console.log(this.answerSelect);

        let token: string = sessionStorage.getItem('token');
        let account: Account = JSON.parse(sessionStorage.getItem('account'));
        let quizID = +sessionStorage.getItem("quizID");

        let today = new Date();
        let finishTimeStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let quizAnswer: QuizAnswer = {
            username: account.username,
            quizId: quizID,
            answerSelect: this.answerSelect,
            startTime: this.startTimeStr,
            finishTime: finishTimeStr
        };

        this.quizAnswerService.addResult(quizAnswer, token).subscribe(
            (data: Result) => {
                sessionStorage.removeItem("quizID");
                sessionStorage.setItem("result", JSON.stringify(data));
                this.router.navigate(['student-quiz-result']);
            }
        );

        clearInterval(this.interval);
    }
}
