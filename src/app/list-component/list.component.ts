import {Component, OnInit} from "@angular/core";
import {HttpService} from "../http-service/http-service.service";
import {Subject} from "rxjs/Subject";
import {ConnectorComponentService} from "../connector-service/connector-component.service";

@Component({
  templateUrl : './list.component.html'
})
export class ListComponent implements OnInit{


  private data : any;

  constructor(private httpService : HttpService , private connectorService : ConnectorComponentService){

  }


  addDataToTable(){
    this.httpService.loadData((jsonData)=>{
        this.data = jsonData;
    });
  }

  tableFilterByName(nama : string){
    this.httpService.loadDataByNama(nama,(jsonData)=>{
        this.data=jsonData;
    });
  }

  ngOnInit(): void {
    this.addDataToTable();
    this.connectorService.createObserverFromPanelToList({
      next : (value)=>{
        if(value === 'load'){
          this.addDataToTable();
        }
      },
      error : (error)=>{

      },
      complete : ()=>{

      }
    });
  }

  onChange(value : string){
    this.tableFilterByName(value);
  }

  selectDelete(p: any) {
    let pegawai = JSON.stringify(p);
    let jsonObject = JSON.parse(pegawai);
    let eventResponse = {
      info : 'delete',
      pegawai : {
        nama : jsonObject.nama_pegawai,
        nip : jsonObject.nip,
        status : jsonObject.status
      }
    };

    this.connectorService.getSubject.next(eventResponse);

  }
  selectUpdate(p: any){
    let pegawai = JSON.stringify(p);
    let jsonObject = JSON.parse(pegawai);

    let eventResponse = {
      info : 'update',
      pegawai : {
        nama : jsonObject.nama_pegawai,
        nip : jsonObject.nip,
        status : jsonObject.status
      }
    };

    this.connectorService.getSubject.next(eventResponse);

  }
}
