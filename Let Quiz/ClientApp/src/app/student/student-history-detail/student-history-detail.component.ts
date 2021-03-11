import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Result} from '../../models/result';
import {ResultService} from '../../services/result.service';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../../models/Answer';
import {Question} from '../../models/Question';

@Component({
    selector: 'app-student-history-detail',
    templateUrl: './student-history-detail.component.html',
    styleUrls: ['./student-history-detail.component.css']
})
export class StudentHistoryDetailComponent implements OnInit, AfterContentChecked {
    ngAfterContentChecked(): void {
        this.cdref.detectChanges();
    }

    resultId: number;
    result: Result;


    constructor(private route: ActivatedRoute, private resultService: ResultService, private cdref: ChangeDetectorRef) {
        this.route.params.subscribe(params => {
            this.resultId = params['resultId'];
        });
    }

    isChoosed(answerId: number) {
        return this.result.answerDtos.find(answer => answer.answerId == answerId) != null;
    }

    isRightClass(answer: Answer) {
        const answerChoosed = this.result.answerDtos.find(a => a.answerId == answer.answerId);
        if (answerChoosed != null) {
            return answerChoosed.isCorrect ? 'text-success' : 'text-danger';
        }
        return answer.isCorrect ? 'text-success' : '';
    }



    ngOnInit() {
        this.resultService.getResultDetail(this.resultId).subscribe(response => {
            this.result = response;
        }, error => console.log(error));
    }

    isRightChoose(question: Question) {
        const rightAnswer = question.answers.find(a => a.isCorrect);
        return this.result.answerDtos.find(a => a.answerId == rightAnswer.answerId);
    }
}
