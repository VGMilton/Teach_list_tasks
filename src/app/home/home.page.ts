import { Component } from '@angular/core';
import { Task } from '../Model/task';
import { TasksService } from '../Services/Tasks/tasks.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private Stask:TasksService
  titulo:any;
  constructor(Stask:TasksService){
    this.Stask = Stask;
    this.titulo="";
  }
  getTasks(){
    return this.Stask.getTasks();
  }

  addTask(){
    try {
      this.Stask.add(this.Stask.create(this.titulo));
      this.titulo='';
    } catch (error:any) {
      console.log(error)
    }
  }

  deleteTask(task:Task){
    try {
      this.Stask.delete(task);
    } catch (error:any) {
      console.log(error.message)
    }
  }
  getProgress(){
    const completed = this.getTasks().filter(task=>task.estado).length;
    const all = this.getTasks().length;
    return completed/all;
  }

}

