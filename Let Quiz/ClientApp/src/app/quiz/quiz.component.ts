import { QuizAnswerService } from './../services/QuizAnswerService';
import { Account } from './../models/Account';
import { QuizAnswer } from './../models/QuizAnswer';
import { AnswerSelect } from './../models/AnswerSelect';
import { Question } from './../models/Question';
import { QuestionService } from './../services/QuestionService';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './quiz.component.html'
})

export class QuizComponent implements OnInit {

    questions: Question[];
    private answerSelect: AnswerSelect[] = [];

    private startTimeStr: string;

    constructor(private questionService: QuestionService, private quizAnswerService: QuizAnswerService) { }

    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
        let quizID = sessionStorage.getItem("quizID");

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
            (data: QuizAnswer) => console.log(data)
        );
    }
}
