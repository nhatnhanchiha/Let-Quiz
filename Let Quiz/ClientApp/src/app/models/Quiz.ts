import {Question} from './Question';

export class Quiz {
    quizId: number;
    name: string;
    password: string;
    createDate: string;
    duration: number;
    maxPoint: number;
    isExpire: boolean;
    teacherName: string;
    questionDtos: Question[];
}
