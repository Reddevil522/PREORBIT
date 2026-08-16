import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { notesPaths } from '../../../config/notes-paths';
import { ProgressService } from '../../../core/services/progress.service';

interface ChapterMeta {
  slug: string;
  title: string;
  path: string;
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
  private progressService = inject(ProgressService);

  sectionTitle = signal<string>('');
  chapters = signal<ChapterMeta[]>([]);
  error = signal<string | null>(null);
  progressData = this.progressService.progressData;

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

      const mappedChapters = chapterKeys.map(key => ({
        slug: key,
        title: key.replace(/-/g, ' '),
        path: `${basePath}/${key}`
      }));
      this.chapters.set(mappedChapters);
      
      this.progressService.getProgress().subscribe();
    });
  }

  getChapterStatus(chapterSlug: string): string {
    const data = this.progressData();
    if (!data) return 'NOT_STARTED';
    const chap = data.chapters.find((c: any) => c.chapterSlug === chapterSlug);
    return chap ? chap.status : 'NOT_STARTED';
  }
}
