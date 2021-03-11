import {Answer} from './Answer';
import {Quiz} from './Quiz';

export interface Result {
    resultId: number;
    point: number;
    startTime: Date;
    finishTime: Date;
    quizId: number;
    nameOfQuiz: string;
    quiz: Quiz;
    answerDtos: Answer[];
}
