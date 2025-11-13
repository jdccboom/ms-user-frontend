import { Injectable } from '@angular/core';
import { StatusProps } from '@shared/enums/config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusPros = new Map<StatusProps, any>();
  private statusSubject = new BehaviorSubject<Map<StatusProps, any>>(new Map());

  readonly statusActual: Observable<Map<StatusProps, any>> = this.statusSubject.asObservable();
 
  get(prop: StatusProps): any {
    return this.statusPros.get(prop);
  }

  getObservable(prop: StatusProps): Observable<any> {
    return new Observable(subscriber => {
      subscriber.next(this.statusPros.get(prop));
      const subscription = this.statusActual.subscribe(updatedStatus => {
        subscriber.next(updatedStatus.get(prop)); 
      });

      return () => subscription.unsubscribe();
    });
  }

 
  update(prop: StatusProps, value: any) {
    const updatedStatus = new Map(this.statusPros);
    updatedStatus.set(prop, value);
    this.statusPros = updatedStatus; 
    this.statusSubject.next(updatedStatus);
  }

  deleteProperties(prop: StatusProps) {
    const updatedStatus = new Map(this.statusPros);
    updatedStatus.delete(prop);
    this.statusPros = updatedStatus;
    this.statusSubject.next(updatedStatus);
  }

  updateProperties(changes: any): void {
    const updatedStatus = new Map(this.statusPros);

    for (const propName in changes) {
      if (propName.toUpperCase() in StatusProps) {
        updatedStatus.set(propName as StatusProps, changes[propName].currentValue);
      }
    }

    this.statusPros = updatedStatus;
    this.statusSubject.next(updatedStatus);
  }
}
