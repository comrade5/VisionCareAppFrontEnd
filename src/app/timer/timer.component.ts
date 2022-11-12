import { Component, OnInit } from '@angular/core';
import {ImageDaemonService} from "../daemon/image-daemon.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  digitSegments = [
    [1,2,3,4,5,6],
    [2,3],
    [1,2,7,5,4],
    [1,2,7,3,4],
    [6,7,2,3],
    [1,6,7,3,4],
    [1,6,5,4,3,7],
    [1,2,3],
    [1,2,3,4,5,6,7],
    [1,2,7,3,6]
  ]

  constructor(private imageDaemonService: ImageDaemonService) { }

  setNumber(digit: Element, number: number, on: number) : void {
    let segments = digit.querySelectorAll('.segment');
    let current = parseInt(digit.getAttribute('data-value')||'');

    // only switch if number has changed or wasn't set
    if (!isNaN(current) && current != number) {
      // unset previous number
      (this.digitSegments)[current].forEach(function(digitSegment, index) {
        setTimeout(function() {
          segments[digitSegment-1].classList.remove('on');
        }, index*45)
      });
    }

    if (isNaN(current) || current != number) {
      // set new number after
      setTimeout(() => {
        (this.digitSegments)[number].forEach(function(digitSegment: number, index: number) {
          setTimeout(function() {
            segments[digitSegment-1].classList.add('on');
          }, index*45)
        });
      }, 250);
      digit.setAttribute('data-value', String(number));
    }
  }

  ngOnInit(): void {
    let _hours = document.querySelectorAll('.hours');
    let _minutes = document.querySelectorAll('.minutes');
    let _seconds = document.querySelectorAll('.seconds');

    setInterval(() => {
      let hours = this.imageDaemonService.getHours, minutes = this.imageDaemonService.getMinutes, seconds = this.imageDaemonService.getSeconds;

      this.setNumber(_hours[0], Math.floor(hours/10), 1);
      this.setNumber(_hours[1], hours%10, 1);

      this.setNumber(_minutes[0], Math.floor(minutes/10), 1);
      this.setNumber(_minutes[1], minutes%10, 1);

      this.setNumber(_seconds[0], Math.floor(seconds/10), 1);
      this.setNumber(_seconds[1], seconds%10, 1);
    }, 1000);
  }

  onStartButtonClicked() {
    this.imageDaemonService.start();
  }

  onStopButtonClicked() {
    this.imageDaemonService.stop();
  }

  onResetButtonClicked() {
    this.imageDaemonService.reset();
  }

  onAddFiveMinutesButtonClicked() {
    this.imageDaemonService.extendPeriod(5);
  }

  getPeriodType() {
    return this.imageDaemonService.getStatus();
  }
}
