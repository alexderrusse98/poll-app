import { computed, Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';

@Component({
  imports: [],
  selector: 'app-home-component',
  styleUrl: './home-component.scss',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  surveysService = inject(SupabaseService)


  activeTab = signal<'active' | 'past'>('active')

  
  filteredSurveys = computed(() => {
    const now = new Date()
    if (this.activeTab() === 'active') {
      return this.surveysService.surveys().filter(s => new Date(s.end_date) > now)
    } else {
      return this.surveysService.surveys().filter(s => new Date(s.end_date) < now)
    }
  }
  )

}
