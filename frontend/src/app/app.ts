import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * PREORBIT — Root Application Component
 *
 * Acts as the shell for the application.
 * All feature pages are rendered via <router-outlet>.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'PREORBIT';
}
