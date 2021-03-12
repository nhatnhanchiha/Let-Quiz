import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Result} from '../models/result';
import {PaginatedResult} from '../models/pagination';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResultService {
    baseUrl = 'https://localhost:44300/api/results';
    results: Result[];
    paginatedResult: PaginatedResult<Result[]> = new PaginatedResult<Result[]>();

    constructor(private http: HttpClient) {
    }

    getResults(page?: number, itemsPerPage?: number): Observable<any> {
        const token = sessionStorage.getItem('token');
        let params = new HttpParams();
        if (page !== null && itemsPerPage !== null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }

        return this.http.get<Result[]>(this.baseUrl + '/student/results',
            {
                observe: 'response', params, headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
            }).pipe(
            map(response => {
                this.paginatedResult.result = response.body;
                if (response.headers.get('Pagination') != null) {
                    this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }
                return this.paginatedResult;
            })
        );
    }

    getResultDetail(resultId: number) {
        const token = sessionStorage.getItem('token');
        return this.http.get<Result>(this.baseUrl + '/student/results/' + resultId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        });
    }
}
