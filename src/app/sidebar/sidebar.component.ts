import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbOffcanvas, NgbOffcanvasConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class SidebarComponent implements OnInit {

  @ViewChild('headerToggle') headerToggle?: ElementRef;
  @ViewChild('header') header?: ElementRef;
  @ViewChild('bodyPd') bodypd?: ElementRef;
  @ViewChild('navbar') navbar?: ElementRef;
  @ViewChild('main') main?: ElementRef;
  @ViewChild('settings') settings?: ElementRef;
  @ViewChild('activity') activity?: ElementRef;
  @ViewChild('planner') planner?: ElementRef;

  previousElement?: HTMLAnchorElement;

  constructor(config: NgbOffcanvasConfig, private offcanvasService: NgbOffcanvas) {
    // customize default values of offcanvas used by this component tree
    config.position = 'start';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }

  showNavbar() {
    this.headerToggle?.nativeElement.classList.toggle('show');
    this.navbar?.nativeElement.classList.toggle('show')
    this.headerToggle?.nativeElement.classList.toggle('bx-x')
    this.bodypd?.nativeElement.classList.toggle('body-pd')
    this.header?.nativeElement.classList.toggle('body-pd')
  }

  onSideBarIconClick(element: HTMLAnchorElement) {
    element.classList.toggle('active');
    this.previousElement?.classList.toggle('active');
    this.previousElement = element;
  }
}
