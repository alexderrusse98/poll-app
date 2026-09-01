import { computed, Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';
import { RouterLink } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home-component',
  styleUrl: './home-component.scss',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  private route = inject(ActivatedRoute)
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
        .sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
    } else {
      return this.surveysService.surveys().filter(s => new Date(s.end_date) < now)
        .filter(s => this.selectedCategory() === 'all' || s.category === this.selectedCategory())
        .sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
    }
  }
  )

  endingSoonSurveys = computed(() => {
    const now = new Date()
    return this.surveysService.surveys().filter(s => new Date(s.end_date) > now)
      .sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime())
      .slice(0, 3)
  })

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.selectedCategory.set(value)
  }
}
