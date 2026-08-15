import { Injectable } from '@angular/core';
import { notesPaths } from '../../config/notes-paths';
import { Notes } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  /**
   * Dynamically loads a notes module based on its path.
   * Path resolution supports 2-level (section -> chapter) 
   * or 3-level (section -> subject -> chapter) hierarchies.
   */
  async getNotes(section: string, subject?: string, chapter?: string): Promise<Notes> {
    try {
      let loader: any = notesPaths[section];
      
      if (!loader) {
        throw new Error('Section not found');
      }

      if (subject) {
        loader = loader[subject];
        if (!loader) {
          throw new Error('Subject not found');
        }
      }

      if (chapter) {
        loader = loader[chapter];
        if (!loader) {
          throw new Error('Chapter not found');
        }
      }

      if (typeof loader !== 'function') {
        throw new Error('Notes path is incomplete or invalid');
      }

      // Execute the lazy-loaded dynamic import
      const notes = await loader();
      
      if (!notes) {
        throw new Error('Notes content is empty');
      }
      
      return notes;
    } catch (error) {
      console.error('Error loading notes:', error);
      throw new Error('Notes not found.');
    }
  }
}
