import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NotesService } from '../../../core/services/notes.service';
import { Notes } from '../../../core/models/notes.model';
import { notesPaths } from '../../../config/notes-paths';

@Component({
  selector: 'app-notes-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notes-viewer.component.html',
  styleUrl: './notes-viewer.component.css'
})
export class NotesViewerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notesService = inject(NotesService);

  notes = signal<Notes | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  isCompleted = signal<boolean>(false);

  // For navigation
  prevChapter = signal<{ title: string, path: string } | null>(null);
  nextChapter = signal<{ title: string, path: string } | null>(null);
  backLink = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isLoading.set(true);
      this.error.set(null);
      this.notes.set(null);

      const section = params.get('section');
      const subject = params.get('subject');
      const chapter = params.get('chapter');

      if (!section || !chapter) {
        this.error.set('Invalid URL');
        this.isLoading.set(false);
        return;
      }

      // Determine back link
      this.backLink.set(subject ? `/${section}/${subject}/theory` : `/${section}/theory`);

      this.notesService.getNotes(section, subject || undefined, chapter)
        .then(notes => {
          this.notes.set(notes);
          this.checkCompletion(chapter);
          this.calculateNavigation(section, subject, chapter);
          this.isLoading.set(false);
        })
        .catch(err => {
          this.error.set('Notes not found.');
          this.isLoading.set(false);
        });
    });
  }

  private calculateNavigation(section: string, subject: string | null, currentChapter: string) {
    let mapping = (notesPaths as any)[section];
    if (subject && mapping) {
      mapping = mapping[subject];
    }

    if (!mapping) return;

    const chapters = Object.keys(mapping);
    const currentIndex = chapters.indexOf(currentChapter);

    const basePath = subject ? `/${section}/${subject}/theory` : `/${section}/theory`;

    if (currentIndex > 0) {
      const prev = chapters[currentIndex - 1];
      this.prevChapter.set({ title: prev.replace(/-/g, ' '), path: `${basePath}/${prev}` });
    } else {
      this.prevChapter.set(null);
    }

    if (currentIndex < chapters.length - 1) {
      const next = chapters[currentIndex + 1];
      this.nextChapter.set({ title: next.replace(/-/g, ' '), path: `${basePath}/${next}` });
    } else {
      this.nextChapter.set(null);
    }
  }

  private checkCompletion(chapter: string) {
    const completed = localStorage.getItem(`completed_theory_${chapter}`);
    this.isCompleted.set(completed === 'true');
  }

  markCompleted() {
    const chapter = this.notes()?.slug;
    if (chapter) {
      localStorage.setItem(`completed_theory_${chapter}`, 'true');
      this.isCompleted.set(true);
    }
  }
}
