import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../../shared/to-do.model';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent  {

  constructor(private toDoService: ToDoService) { }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.toDoService.addToDo(new ToDo(form.value.toDoInput));
      form.reset();
    }
  }
}
