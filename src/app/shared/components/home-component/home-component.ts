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

  selectedCategory = signal<string>('all')

  // availableCategories = computed(() =>
  //[...new Set(this.surveysService.surveys().map(s => s.category))]
  // )


  availableCategories = computed(() => {
    const allCategories = this.surveysService.surveys().map(s => s.category)
    const unique = new Set(allCategories)
    return [...unique]
  })


  filteredSurveys = computed(() => {
    const now = new Date()
    if (this.activeTab() === 'active') {
      return this.surveysService.surveys().filter(s => new Date(s.end_date) > now)
        .filter(s => this.selectedCategory() === 'all' || s.category === this.selectedCategory())
    } else {
      return this.surveysService.surveys().filter(s => new Date(s.end_date) < now)
        .filter(s => this.selectedCategory() === 'all' || s.category === this.selectedCategory())
    }
  }
  )

}
