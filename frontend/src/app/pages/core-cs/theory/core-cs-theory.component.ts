import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { coreCsSubjects, CoreCsSubject, CoreCsChapter } from '../../../config/core-cs.config';

@Component({
  selector: 'app-core-cs-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './core-cs-theory.component.html',
  styleUrl: './core-cs-theory.component.css'
})
export class CoreCsTheoryComponent implements OnInit {
  subject = signal<CoreCsSubject | null>(null);
  searchQuery = signal('');

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const subjectSlug = params.get('subject');
      if (subjectSlug) {
        const found = coreCsSubjects.find(s => s.slug === subjectSlug);
        this.subject.set(found || null);
      }
    });
  }

  isChapterCompleted(chapterSlug: string): boolean {
    return localStorage.getItem(`completed_theory_core-cs/${this.subject()?.slug}/${chapterSlug}`) === 'true';
  }

  isChapterInProgress(chapterSlug: string): boolean {
    return localStorage.getItem(`opened_theory_core-cs/${this.subject()?.slug}/${chapterSlug}`) === 'true' && !this.isChapterCompleted(chapterSlug);
  }
}
