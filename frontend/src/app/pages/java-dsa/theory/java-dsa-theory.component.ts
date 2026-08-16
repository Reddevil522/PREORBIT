import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { javaDsaChapters, JavaDsaChapter } from '../../../config/java-dsa.config';
import { ProgressService } from '../../../core/services/progress.service';

export interface ChapterWithStatus extends JavaDsaChapter {
}

@Component({
  selector: 'app-java-dsa-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './java-dsa-theory.component.html',
  styleUrl: './java-dsa-theory.component.css'
})
export class JavaDsaTheoryComponent implements OnInit {
  private progressService = inject(ProgressService);
  
  chapters = signal<JavaDsaChapter[]>([]);
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(false);
  progressData = this.progressService.progressData;

  ngOnInit() {
    this.loadChapters();
  }

  loadChapters() {
    this.chapters.set(javaDsaChapters);
    this.progressService.getProgress().subscribe();
  }

  getChapterProgress(chapterSlug: string) {
    const data = this.progressData();
    if (!data) return null;
    return data.chapters.find((c: any) => c.chapterSlug === chapterSlug);
  }

  getChapterStatus(chapterSlug: string): string {
    const prog = this.getChapterProgress(chapterSlug);
    if (!prog) return 'NOT_STARTED';
    return prog.status;
  }

  isTheoryCompleted(chapterSlug: string): boolean {
    const prog = this.getChapterProgress(chapterSlug);
    return prog ? prog.theoryCompleted : false;
  }

  filteredChapters = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.chapters();
    if (!query) return all;

    return all.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    );
  });

  onChapterClick(chapter: JavaDsaChapter) {
    // Progress state is updated automatically when theory completes.
  }
}

