import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { SupabaseService } from '../../services/supabase';
import { Answer, Question } from '../../interfaces/survey.interfaces';

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
    this.supabaseService.getQuestionsBySurveyId(currentId)

  }
  currentSurvey = this.supabaseService.currentSurvey;
  currentSurveyQuestions = this.supabaseService.surveysQuestions;


  // update votess
  async updateVotes(question: Question, answer: Answer) {
    const newAnswers = question.answers.map(a => {
      if (a.text === answer.text) {
        return { ...a, votes: a.votes + 1 }
      }
      return a
    })
    await this.supabaseService.updateQuestionAnswers(question.id, newAnswers)
    this.supabaseService.getQuestionsBySurveyId(question.survey_id)
  }
}
