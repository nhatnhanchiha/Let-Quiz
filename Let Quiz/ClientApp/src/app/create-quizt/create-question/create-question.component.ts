import { Router } from '@angular/router';
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.css'],
    providers: [NgbModal]
})

export class CreateQuestionComponent implements OnInit {

    account: Account = JSON.parse(sessionStorage.getItem('account'));
    listQuestion: Question[] = JSON.parse(sessionStorage.getItem('listQuestion'));
    question: Question = {
        questionId: 1,
        content: "",
        answers: new Array()
    };
    correctAnswer: string;
    otherAnswer: string;
    otherChoice: string[] = new Array();
    otherChoices: Answer[] = new Array();
    a: Answer = {
        answerId: 1,
        content: "",
        isCorrect: true
    };
    massageCreateQuizt: string;
    constructor(private router: Router, private modalService: NgbModal) {     }
    errorCreateQuestion: string;
    ngOnInit() {
        let token: string = sessionStorage.getItem('token');
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
    addChocie(error) {
        if (this.otherChoice.includes(this.otherAnswer) || this.otherAnswer === this.correctAnswer || this.otherAnswer.length == 0) {
            this.errorCreateQuestion = "can't add this choice";
            this.modalService.open(error);
            //confirm("can't add this choice");
        } else {
            this.otherChoice.push(this.otherAnswer);
            var x: Answer = {
                answerId: 1,
                content: this.otherAnswer,
                isCorrect: false
            };
            this.otherChoices.push(x);
        }
    }
    removeChocie(fg: string) {
        let index = this.otherChoice.findIndex(c => c === fg);
        this.otherChoice.splice(index, 1);
        this.otherChoices.splice(index, 1);
    }
    cancel(cancelShowBox) {
        this.modalService.open(cancelShowBox);
    }
    backcreatequiz() {
        this.router.navigate(['/createQuizt']);
        this.modalService.dismissAll();
    }
    onSubmit(error,message) {
        if (this.otherChoice.includes(this.correctAnswer)) {
            this.errorCreateQuestion = "Plase enter correct answer disferrence other choice";
            this.modalService.open(error);
            //confirm("Plase enter correct answer disferrence other choice");
        } else {
            if (this.otherChoice.length <= 0) {
                this.errorCreateQuestion = "add more other choice to create question";
                this.modalService.open(error);
                //confirm("add more other choice to create question");
            } else {
                this.a.content = this.correctAnswer;
                this.question.answers.push(this.a);
                for (let s of this.otherChoices) {
                    this.question.answers.push(s);
                }
                this.question.questionId = 0;
                this.listQuestion.push(this.question);
                sessionStorage.setItem('listQuestion', JSON.stringify(this.listQuestion));
                this.massageCreateQuizt = "add question successful";
                this.modalService.open(message);
                this.router.navigate(['/createQuizt']);
            }
        }
    }
}
