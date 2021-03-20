import {Component, OnInit} from '@angular/core';
import {ResultService} from '../../services/result.service';
import {Result} from '../../models/result';
import {Pagination} from '../../models/pagination';

@Component({
    selector: 'app-student-histories',
    templateUrl: './student-histories.component.html',
    styleUrls: ['./student-histories.component.css']
})
export class StudentHistoriesComponent implements OnInit {
    results: Result[];
    pagination: Pagination;
    pageNumber = 1;
    pageSize = 5;
    quizName = "";

    constructor(private resultService: ResultService) {
    }

    ngOnInit() {
        this.loadResults();
    }

    search() {
        this.pageNumber = 1;
        this.pageSize = 5;
        this.loadResults();
    }

    loadResults() {
        this.resultService.getResults(this.pageNumber, this.pageSize, this.quizName).subscribe(response => {
            this.results = response.result;
            this.pagination = response.pagination;
        })
    }

    pageChanged($event: number) {
        this.pageNumber = $event;
        this.loadResults();
    }
}
