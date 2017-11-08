import {Component, OnInit} from "@angular/core";
import {HttpService} from "../http-service/http-service.service";
import {ConnectorComponentService} from "../connector-service/connector-component.service";

@Component({
   templateUrl : './form.component.html'
})
export class FormComponent implements OnInit{

  nip : string;
  nama : string;
  status : string ;


  constructor(
    private httpService : HttpService,
    private connectorService : ConnectorComponentService){

  }

  doSave(){
    this.httpService.insertPegawai({
      nip : parseInt(this.nip),
      nama : this.nama,
      status : this.status
    });
  }

  ngOnInit(): void {
    this.connectorService.clearCardInfo();
  }
}
