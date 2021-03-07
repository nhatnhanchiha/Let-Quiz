import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { StudentIndexGuard } from './student/student-index.guard';
import { TeacherIndexGuard } from './teacher/teacher-index.guard';
import {TeacherIndexComponent } from './teacher/teacher-index.component';
import { StudentIndexComponent } from './student/student-index.component';
import { LoginComponent } from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        StudentIndexComponent,
        RegisterComponent,
        QuizComponent,
        TeacherIndexComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        NgbModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            {
                path: 'student-index',
                canActivate: [StudentIndexGuard],
                component: StudentIndexComponent
            },
            { path: 'register', component: RegisterComponent },
            { path: 'quiz', component: QuizComponent },
            {
                path: 'teacher-index',
                canActivate: [TeacherIndexGuard],
                component: TeacherIndexComponent
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
