import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { quantitativeChapters, logicalReasoningChapters, AptitudeChapter } from '../../../config/aptitude.config';

export interface AptitudeChapterWithStatus extends AptitudeChapter {
  status: 'Not Started' | 'In Progress' | 'Completed';
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

  subject = signal<string>('');
  title = signal<string>('');
  chapters = signal<AptitudeChapterWithStatus[]>([]);
  searchQuery = signal<string>('');

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

      const enriched: AptitudeChapterWithStatus[] = baseChapters.map(chapter => {
        let status: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';
        
        const isCompleted = localStorage.getItem(`completed_theory_${chapter.slug}`) === 'true';
        const isOpened = localStorage.getItem(`opened_theory_${chapter.slug}`) === 'true';
        
        if (isCompleted) {
          status = 'Completed';
        } else if (isOpened) {
          status = 'In Progress';
        }

        return { ...chapter, status };
      });
      
      this.chapters.set(enriched);
    });
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

  onChapterClick(chapter: AptitudeChapterWithStatus) {
    if (chapter.status === 'Not Started') {
      localStorage.setItem(`opened_theory_${chapter.slug}`, 'true');
      chapter.status = 'In Progress';
    }
  }
}
