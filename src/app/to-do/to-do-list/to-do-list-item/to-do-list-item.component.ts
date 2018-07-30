import {Component, Input, OnInit} from '@angular/core';
import {ToDo} from '../../../shared/to-do.model';
import {ToDoService} from '../../to-do.service';


@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.css']
})
export class ToDoListItemComponent implements OnInit {
  @Input() toDo: ToDo;
  @Input() lastToDo = false;
  hovered = false;
  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    console.log(this.lastToDo);
  }
  toggleState() {
    this.toDoService.toggleState(this.toDo);
  }
  removeElement() {
    this.toDoService.removeToDo(this.toDo);
  }
}
