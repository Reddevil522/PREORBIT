import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { coreCsSubjects, CoreCsSubject } from '../../../config/core-cs.config';

@Component({
  selector: 'app-core-cs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './core-cs.component.html',
  styleUrl: './core-cs.component.css'
})
export class CoreCsComponent {
  subjects = signal<CoreCsSubject[]>(coreCsSubjects);
}
