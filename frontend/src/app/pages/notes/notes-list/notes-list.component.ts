import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { notesPaths } from '../../../config/notes-paths';

interface ChapterMeta {
  slug: string;
  title: string;
  path: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent implements OnInit {
  private route = inject(ActivatedRoute);

  sectionTitle = signal<string>('');
  chapters = signal<ChapterMeta[]>([]);
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const section = params.get('section');
      const subject = params.get('subject');

      if (!section) {
        this.error.set('Invalid URL');
        return;
      }

      let mapping = (notesPaths as any)[section];
      let titlePrefix = section.replace(/-/g, ' ');

      if (subject && mapping) {
        mapping = mapping[subject];
        titlePrefix = subject.replace(/-/g, ' ');
      }

      if (!mapping || typeof mapping === 'function') {
        this.error.set('Theory chapters not found.');
        return;
      }

      this.sectionTitle.set(titlePrefix);

      const chapterKeys = Object.keys(mapping);
      const basePath = subject ? `/${section}/${subject}/theory` : `/${section}/theory`;

      const mappedChapters = chapterKeys.map(key => {
        const completed = localStorage.getItem(`completed_theory_${key}`) === 'true';
        return {
          slug: key,
          title: key.replace(/-/g, ' '),
          path: `${basePath}/${key}`,
          isCompleted: completed
        };
      });

      this.chapters.set(mappedChapters);
    });
  }
}
