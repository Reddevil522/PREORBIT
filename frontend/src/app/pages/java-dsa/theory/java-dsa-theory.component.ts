import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { javaDsaChapters, JavaDsaChapter } from '../../../config/java-dsa.config';

export interface ChapterWithStatus extends JavaDsaChapter {
  status: 'Not Started' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-java-dsa-theory',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './java-dsa-theory.component.html',
  styleUrl: './java-dsa-theory.component.css'
})
export class JavaDsaTheoryComponent implements OnInit {
  chapters = signal<ChapterWithStatus[]>([]);
  searchQuery = signal<string>('');

  ngOnInit() {
    this.loadChapters();
  }

  loadChapters() {
    const enriched: ChapterWithStatus[] = javaDsaChapters.map(chapter => {
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

  onChapterClick(chapter: ChapterWithStatus) {
    if (chapter.status === 'Not Started') {
      localStorage.setItem(`opened_theory_${chapter.slug}`, 'true');
      chapter.status = 'In Progress';
    }
  }
}
