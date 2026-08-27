import { Service, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Survey } from '../interfaces/survey.interfaces';

@Service()

export class SupabaseService {
    supabase = createClient(
        "https://dlsuaqkhviftlfkhcncz.supabase.co",
        "sb_publishable_D_YaFzUELLVhbPQhY82CVg_k_pyYWok"
    );


    // was macht das genau?
    surveys = signal<Survey[]>([])


    async getSurveys() {
        let response = await this.supabase
            .from('surveys')
            .select('*')
        if (response.error) console.error('hat nicht geklappt')
        console.log(response.data);
        this.surveys.set((response.data ?? []) as Survey[])
    }
}