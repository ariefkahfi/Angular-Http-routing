import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ConnectorComponentService {
  private subject = new Subject();
  private subject1 = new Subject();


  createObserver(observer : {
    next : (value )=> void,
    error : (error)=> void,
    complete : ()=>void

  }){
    this.getSubject.subscribe(observer);
  }


  clearCardInfo(){
    document.getElementById('deleteModelP').innerHTML = "Do Delete Action";
    document.getElementById('updateModelP').innerHTML = "Do Update Action";
    ((<HTMLButtonElement>document.getElementById('header-delete')).disabled) = true;
    ((<HTMLButtonElement>document.getElementById('header-update')).disabled) = true;
  }

  createObserverFromPanelToList(observer : {
    next : (value)=>void ,
    error : (error)=>void,
    complete : ()=>void
  }){
    this.getSubject1.subscribe(observer);
  }

  get getSubject1(){
    return this.subject1;
  }
  get getSubject(){
    return this.subject;
  }
}
