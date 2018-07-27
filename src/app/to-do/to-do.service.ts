import { Injectable } from '@angular/core';
import { ToDo } from '../shared/to-do.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ToDoService {
  private toDos: ToDo[] = [];
  private myStorage = window.localStorage;
  private updateSubscription;

  readonly targetLocation = 'toDos';

  toDoUpdated = new Subject<ToDo[]>();

  constructor() {
     this.toDos = this.getDataFromLocalStore();
     this.updateSubscription = this.toDoUpdated.subscribe((toDos: ToDo[]) => {this.putDataToLocalStore(toDos); });
  }
  getToDos(): ToDo[] {
    return this.toDos.slice();
  }
  addToDo(toDo: ToDo) {
    this.toDos.push(toDo);
    this.toDoUpdated.next(this.toDos.slice());
  }
  removeToDo(toDo: ToDo) {
    this.toDos.splice(this.toDos.indexOf(toDo), 1);
    this.toDoUpdated.next(this.toDos.slice());
  }
  toggleState(toDo: ToDo) {
    this.toDos[this.toDos.indexOf(toDo)].state = !toDo.state;
    this.toDoUpdated.next(this.toDos.slice());
  }

  getDataFromLocalStore(): ToDo[] {
    if (this.myStorage.getItem(this.targetLocation) != null) {
      return (<ToDo[]>JSON.parse(this.myStorage.getItem(this.targetLocation)));
    } else {
      return [];
    }
  }
  putDataToLocalStore(toDos: ToDo[]) {
    this.myStorage.setItem(this.targetLocation, JSON.stringify(toDos));
  }

}
