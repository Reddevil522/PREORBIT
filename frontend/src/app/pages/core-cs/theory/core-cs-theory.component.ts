import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { coreCsSubjects, CoreCsSubject, CoreCsChapter } from '../../../config/core-cs.config';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-core-cs-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './core-cs-theory.component.html',
  styleUrl: './core-cs-theory.component.css'
})
export class CoreCsTheoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private progressService = inject(ProgressService);

  subject = signal<CoreCsSubject | null>(null);
  searchQuery = signal('');
  progressData = this.progressService.progressData;

  filteredChapters = computed(() => {
    const currentSubject = this.subject();
    if (!currentSubject) return [];
    
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return currentSubject.chapters;
    
    return currentSubject.chapters.filter(chapter => 
      chapter.title.toLowerCase().includes(query) || 
      chapter.description.toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    this.progressService.getProgress().subscribe();
    this.route.paramMap.subscribe(params => {
      const subjectSlug = params.get('subject');
      if (subjectSlug) {
        const found = coreCsSubjects.find(s => s.slug === subjectSlug);
        this.subject.set(found || null);
      }
    });
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
}

