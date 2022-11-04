import { Component, OnInit } from '@angular/core';
import {Item} from "../models/interfaces";

const ITEMS: Item[] = [
  {
    name: 'Eye exercises',
    link: 'https://kraffeye.com/blog/8-easy-eye-exercises-to-improve-vision-techniques-and-tips',
    summary: `
      Exercise for your eyes, traditionally in the form of vision therapy,
      can help to ensure that the two eyes work together effectively.
      There are common symptoms that may indicate that eye strengthening exercises may be useful.
    `
  },
  {
    name: 'Best practices for productive work',
    link: 'https://www.indeed.com/career-advice/career-development/ways-to-be-more-productive',
    summary: `
      Being able to dedicate time to specific tasks,
      completing them and ending your workday with
      a quality output can be an overall measure of your productivity.
    `
  },
  {
    name: 'Tips to keep eyes healthy',
    link: 'https://www.webmd.com/eye-health/good-eyesight',
    summary: `
      Good eye health starts with the food on your plate.
      Nutrients like omega-3 fatty acids, lutein, zinc,
      and vitamins C and E might help ward off age-related
      vision problems like macular degeneration and cataracts.
    `
  }
]

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  started: boolean = false;
  items = ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

  onStartClicked($event: HTMLSpanElement, startButton: HTMLButtonElement) {
    $event.innerText = this.started ? 'Start' : 'Stop';
    startButton.classList.toggle('text-bg-light');
    this.started = !this.started;
  }
}
