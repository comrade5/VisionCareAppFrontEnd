import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../models/interfaces";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  @Input() items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
