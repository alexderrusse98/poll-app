import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase';

@Component({
  imports: [],
  selector: 'app-home-component',
  styleUrl: './home-component.scss',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  surveysService = inject(SupabaseService)

  list = this.surveysService.surveys
}
