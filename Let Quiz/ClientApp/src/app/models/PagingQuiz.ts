import { Quiz } from './Quiz';

export class PagingQuiz {

    searchValue: string;
    currentPage: number;
    maxPage: number;
    nextPage: string;
    previousPage: string
    quizzes: Quiz[];
}