import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAX_ITEM } from '@data/constants/movie';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  @Input() pageActual: number = 0;
  @Input() total_pages: number = 0;
  @Output() pageSelecion = new EventEmitter<string>();

  item: number [] = [];

  ngOnInit(): void {
    
  }

  isDisabledBack(): boolean {
    return this.pageActual <= 1;
  }

  isDisabledNext(): boolean {
    return this.pageActual >= this.total_pages;
  }

  selectPage(page: number) {
    if(page >= 1 && page <= this.total_pages)  {
      this.pageActual= page;
      this.pageSelecion.emit(`${page}`);
    }
  }

  initItem(): void {
    const inicioItem = 1;
    let finItem = 1;
    let maxItem = MAX_ITEM;

    if(this.total_pages < maxItem){
      maxItem = this.total_pages;
    }

    if( this.pageActual > 3){
      finItem= this.pageActual + maxItem
    }

    for (let i = finItem - maxItem; i < finItem; i++) {
      this.item.push(i);
    }
  }
}
