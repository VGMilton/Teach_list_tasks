import { Injectable } from '@angular/core';
import { Task } from 'src/app/Model/task';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks:Task[] = [];

  constructor(){
    this.initTasks();
  }

  async initTasks() {
    const storedTodos = await this.getTodosFromStorage();
    this.tasks = storedTodos;
  }

  private async getTodosFromStorage() {
    return new Promise<Task[]>((resolve) => {
     const storedtasks = localStorage.getItem('tasks');
     if(storedtasks){
       JSON.parse(storedtasks) as Task[];
     }else{
       resolve([]);
     }
   });
 }

  private async saveTasksonStorage(){
    await new Promise(((resolve)=>{
      localStorage.setItem('tasks',JSON.stringify(this.tasks));
      resolve(true);
    })) 
  }

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
    this.saveTasksonStorage();
  }

  delete(task:Task){
    try {
      this.tasks.splice(this.getIndexbyId(task.id),1);
      this.saveTasksonStorage();

    } catch (error:any) {
      throw error.message;
    }
  }
}
