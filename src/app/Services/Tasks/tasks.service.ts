import { Injectable } from '@angular/core';
import { Task } from 'src/app/Model/task';
import {Storage} from '@ionic/storage-angular'
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks:Task[] = [];

  constructor(private storage:Storage){
    this.initTasks();
  }

  async initTasks() {
    const storedTodos = await this.getTasksFromStorage();
    this.tasks = storedTodos;
  }

  private async getTasksFromStorage() {
    return new Promise<Task[]>(async (resolve)=>{
      await this.storage.create(); 
      const recover = await this.storage.get('tasks');
      if(await recover){
        resolve(JSON.parse(recover));
      }else{
        resolve([]);
      }
    })
  }

  private async saveTasksonStorage(){
    await new Promise(((resolve)=>{
      this.storage.set('tasks',JSON.stringify(this.tasks));
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

  edit(task:Task){
    try {
      const index = this.getIndexbyId(task.id);
      this.tasks.splice(index,1,task);
      this.saveTasksonStorage();
    } catch (error:any) {
      throw error.message;
    }
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
