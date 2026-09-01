import { Service, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Survey } from '../interfaces/survey.interfaces';

@Service()

export class SupabaseService {
    supabase = createClient(
        "https://dlsuaqkhviftlfkhcncz.supabase.co",
        "sb_publishable_D_YaFzUELLVhbPQhY82CVg_k_pyYWok"
    );

    surveys = signal<Survey[]>([])

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
}