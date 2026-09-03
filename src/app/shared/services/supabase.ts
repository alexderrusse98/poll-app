import { Service, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Question, Survey } from '../interfaces/survey.interfaces';

@Service()

export class SupabaseService {
    supabase = createClient(
        "https://dlsuaqkhviftlfkhcncz.supabase.co",
        "sb_publishable_D_YaFzUELLVhbPQhY82CVg_k_pyYWok"
    );

    surveys = signal<Survey[]>([])
    surveysQuestions = signal<Question[]>([])


    currentSurvey = signal<Survey | null>(null)

    activTab = signal<'active' | 'past'>('active')

    async getSurveys() {
        let response = await this.supabase
            .from('surveys')
            .select('*')
        if (response.error) {
            console.error('Error fetching surveys:', response.error);
            return;
        }
        console.log(response.data)
        this.surveys.set((response.data ?? []) as Survey[])
    }

    async getSurveyById(id: number) {
        let response = await this.supabase
            .from('surveys')
            .select('*')
            .eq('id', id)
            .single()

        if (response.error) {
            console.error('Error fetching surveys:', response.error);
            return;
        }
        this.currentSurvey.set(response.data as Survey)
    }

    async getQuestionsBySurveyId(surveyId: number) {
        let response = await this.supabase
            .from('questions')
            .select('*')
            .eq('survey_id', surveyId)
        if (response.error) {
            console.error('Error fetching surveys:', response.error);
            return;
        }
        this.surveysQuestions.set(response.data as Question[])
        console.log(response.data)
    }
}