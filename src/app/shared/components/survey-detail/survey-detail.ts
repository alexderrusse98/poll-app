import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { SupabaseService } from '../../services/supabase';

@Component({
  imports: [RouterLink],
  selector: 'app-survey-detail',
  styleUrl: './survey-detail.scss',
  templateUrl: './survey-detail.html',
})
export class SurveyDetail {
  private route = inject(ActivatedRoute)
  supabaseService = inject(SupabaseService)

  detailSurvey = this.supabaseService.surveys;


  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    this.supabaseService.getSurveyById(currentId)
  }

  currentSurvey = this.supabaseService.curretnSurvey;
}
