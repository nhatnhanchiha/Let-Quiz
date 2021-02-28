import { TeacherIndexGuard } from './teacher/teacher-index.guard';
import { TeacherIndexComponent } from './teacher/teacher-index.component';
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
        TeacherIndexComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
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
