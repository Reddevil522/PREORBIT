import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { quantitativeChapters, logicalReasoningChapters, AptitudeChapter } from '../../../config/aptitude.config';
import { ProgressService } from '../../../core/services/progress.service';

export interface AptitudeChapterWithStatus extends AptitudeChapter {
}

@Component({
  selector: 'app-aptitude-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './aptitude-theory.component.html',
  styleUrl: './aptitude-theory.component.css'
})
export class AptitudeTheoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private progressService = inject(ProgressService);

  subject = signal<string>('');
  title = signal<string>('');
  chapters = signal<AptitudeChapter[]>([]);
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(false);
  progressData = this.progressService.progressData;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const subjectParam = params.get('subject') || '';
      this.subject.set(subjectParam);
      
      let baseChapters: AptitudeChapter[] = [];
      
      if (subjectParam === 'quantitative') {
        this.title.set('Quantitative Aptitude Theory');
        baseChapters = quantitativeChapters;
      } else if (subjectParam === 'logical-reasoning') {
        this.title.set('Logical Reasoning Theory');
        baseChapters = logicalReasoningChapters;
      }
      this.chapters.set(baseChapters);
    });
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

  onChapterClick(chapter: AptitudeChapter) {
    // Left empty since progress state is updated automatically when theory completes.
  }
}

