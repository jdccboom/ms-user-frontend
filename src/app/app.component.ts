import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { StatusProps } from '@shared/enums/config';
import { StatusService } from '@shared/services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnChanges{

  private readonly _statusService = inject(StatusService);
  
  title = 'MovieFront';

  ngOnChanges(changes: SimpleChanges): void {
    if( changes ){
      this._statusService.update(StatusProps.TITLE, this.title)
    }
    this._statusService.updateProperties(changes);
  }
}
