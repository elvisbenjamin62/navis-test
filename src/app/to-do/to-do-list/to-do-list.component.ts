import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToDo} from '../../shared/to-do.model';
import {Subscription} from 'rxjs/Subscription';
import {ToDoService} from '../to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  toDos: ToDo[];
  toDoSubscription: Subscription;

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.toDos = this.toDoService.getToDos();
    this.toDoSubscription = this.toDoService
      .toDoUpdated
      .subscribe((toDos: ToDo[]) => {this.toDos = toDos; });
  }

  ngOnDestroy(): void {
    this.toDoSubscription.unsubscribe();
  }

}
