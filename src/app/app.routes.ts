import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home-component/home-component';
import { SurveyDetail } from './shared/components/survey-detail/survey-detail';


export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "survey-detail",
        component: SurveyDetail
    }
];
