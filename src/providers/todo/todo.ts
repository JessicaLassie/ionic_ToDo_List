import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class TodoProvider {

  private todoList = [];

  constructor(public storage:Storage){

  }

  private persist(){
    this.storage.set("todoList", JSON.stringify(this.todoList));
  }

  public getAll(){
    return new Promise(
      (resolve, reject) =>{
        this.storage.get("todoList").then((data)=>{
          this.todoList = JSON.parse(data) || [];
          resolve(this.todoList);
      });
    });  
  }

  public getDone(){
    return this.todoList.filter((item)=>{return item.done});
  }

  public getNotDone(){
    return this.todoList.filter((item)=>{return ! item.done});
  }

  public delete(pos){
    this.todoList.splice(pos, 1);
    this.persist();
  }

  add(todo){
    this.todoList.push(todo);
    this.persist();
  }

  edit(todo){
    //rien à faire pour l'instant
    this.persist();
  }
}
