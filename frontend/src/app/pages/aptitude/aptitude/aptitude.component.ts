import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * PREORBIT — Aptitude Page Component
 * Route: /aptitude
 *
 * Quantitative and logical reasoning sections will be built in later prompts.
 */
@Component({
  selector: 'app-aptitude',
  imports: [RouterLink],
  templateUrl: './aptitude.component.html',
  styleUrl: './aptitude.component.css'
})
export class AptitudeComponent {}
