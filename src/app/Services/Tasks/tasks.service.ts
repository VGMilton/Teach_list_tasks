import { Injectable } from '@angular/core';
import { Task } from 'src/app/Model/task';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks:Task[] =[];

  getTasks(){
    return this.tasks;
  }

  getIndexbyId(id:number){
    let index = this.tasks.findIndex(i=>i.id==id);
    if(index==-1) throw new Error("Task not found");
    return index;
  }

  create(titulo:string):Task{
    if(!titulo || titulo.trim().length===0) throw new Error("Ingrese los datos solicitados");
    return new Task(this.tasks.length,titulo);    
  }

  add(task:Task){
    this.tasks.push(task);
  }

  delete(task:Task){
    try {
      this.tasks.splice(this.getIndexbyId(task.id),1);
    } catch (error:any) {
      throw error.message;
    }
  }



  
}
