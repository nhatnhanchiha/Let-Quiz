import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {QuizComponent} from './quiz/quiz.component';
import {RegisterComponent} from './register/register.component';
import {TeacherIndexGuard} from './teacher/teacher-index.guard';
import {TeacherIndexComponent} from './teacher/teacher-index.component';
import {StudentIndexComponent} from './student/student-index.component';
import {LoginComponent} from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {StudentProfileComponent} from './student/student-profile/student-profile.component';
import {StudentNavComponent} from './student/student-nav/student-nav.component';
import {StudentAuthGuard} from './_guard/student-auth.guard';
import {StudentHistoriesComponent} from './student/student-histories/student-histories.component';
import {StudentHistoryDetailComponent} from './student/student-history-detail/student-history-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StudentIndexComponent,
        RegisterComponent,
        QuizComponent,
        TeacherIndexComponent,
        StudentProfileComponent,
        StudentNavComponent,
        StudentHistoriesComponent,
        StudentHistoryDetailComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent},
            {
                path: '',
                runGuardsAndResolvers: 'always',
                canActivate: [StudentAuthGuard],
                children: [
                    {path: 'student-index', component: StudentIndexComponent},
                    {path: 'student/profile', component: StudentProfileComponent},
                    {path: 'quiz', component: QuizComponent},
                ]
            },
            {path: 'student-histories-quiz/:resultId', component: StudentHistoryDetailComponent},
            {path: 'student-histories-quiz', component: StudentHistoriesComponent},
            {path: 'register', component: RegisterComponent},
            {
                path: 'teacher-index',
                canActivate: [TeacherIndexGuard],
                component: TeacherIndexComponent
            },
        ]),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
