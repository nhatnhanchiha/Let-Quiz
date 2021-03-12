import { Quiz } from './Quiz';

export class QuizPaging {

    searchValue: string;
    currentPage: number;
    maxPage: number;
    nextPage: string;
    previousPage: string;
    quizzes: Quiz[];
}