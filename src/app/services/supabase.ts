import { Service } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Service()

export class SupabaseService {
    supabase = createClient(
        "https://dlsuaqkhviftlfkhcncz.supabase.co",
        "sb_publishable_D_YaFzUELLVhbPQhY82CVg_k_pyYWok"
    );

    async getSurveys() {
        let response = await this.supabase
            .from('surveys')
            .select('*')
        console.log(response.data);
    }
}