import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectorComponentService} from "../connector-service/connector-component.service";
import {HttpService} from "../http-service/http-service.service";

@Component({
  selector : "panel-component",
  templateUrl : './panel.component.html'
})
export class PanelComponent implements OnInit{

  updateStatus : string;
  updateNIP  : string;
  updateNama : string;


  deleteNIP: number = 0 ;
  disabledUpdate: boolean = true;
  disabledDelete: boolean = true;

  constructor(
    private router : Router ,
    private activateRoute : ActivatedRoute ,
    private connectorService : ConnectorComponentService,
    private httpService : HttpService){

  }

  // initPropertyForSelectDelete(value : any){
  //   this.selectedDeleteNIP = value.nip;
  //   this.selectedDeleteNama = value.nama;
  //   this.selectedDeleteStatus = value.status;
  // }
  // initPropertyForSelectUpdate(value : any){
  //   this.selectedUpdateNIP = value.nip;
  //   this.selectedUpdateNama = value.nama;
  //   this.selectedUpdateStatus = value.status;
  // }


  getPForSelectDelete(value : any){
    if(value!==null){
      document.getElementById('deleteModelP').innerHTML =
        "NIP : " + value.nip + "<br/>" +
        "Nama : " + value.nama+ "<br/>" +
        "Status : " + value.status;
    }else{
      document.getElementById('deleteModelP').innerHTML = "Do Delete Action";
    }
  }
  getPForSelectUpdate(value : any){
    if(value!==null){
      document.getElementById('updateModelP').innerHTML =
        "NIP :  " + value.nip + "<br/>" +
        "Nama : " + value.nama + "<br/>" +
        "Status : " + value.status;
    }else{
      document.getElementById('updateModelP').innerHTML = "Do Update Action";
    }
  }


  responseSelectDelete(value :  any){
    this.getPForSelectDelete(value);
  }
  responseSelectUpdate(value : any){
    this.getPForSelectUpdate(value);
  }

  ngOnInit(): void {

    this.connectorService.createObserver({
      next : (value  : any)=>{
          if(value.info === 'delete'){
              // this.initPropertyForSelectDelete(value.pegawai);

              this.responseSelectDelete(value.pegawai);
              this.responseSelectUpdate(null);

              this.disabledDelete = false;
              this.disabledUpdate = true;

            this.deleteNIP = value.pegawai.nip;

            this.updateNIP = '';
            this.updateStatus = '';
            this.updateNama = '';

          }else if(value.info === 'update'){

            this.deleteNIP = 0;

            this.disabledUpdate = false;
            this.disabledDelete = true;


            this.updateNama = value.pegawai.nama;
            this.updateStatus = value.pegawai.status;
            this.updateNIP = value.pegawai.nip;

              // this.initPropertyForSelectDelete(null);

              this.responseSelectUpdate(value.pegawai);
              this.responseSelectDelete(null);

          }
      },
      error : (error)=>{

      },
      complete : ()=>{

      }
    });
    let a = document.getElementsByClassName('dialog-container')[0];
    let b = document.getElementsByClassName('dialog-container')[1];
    ((<HTMLElement>b).style.display) = "none";
    ((<HTMLElement>a).style.display) = "none";


     window.onclick = (event) =>{
       let targetDialog = ((<HTMLElement>event.target));

       // console.log(targetDialog.id);

       if(targetDialog.id === 'dialog-delete'){
          targetDialog.style.display = 'none';
       }else if(targetDialog.id === 'dialog-update'){
          targetDialog.style.display = 'none';
       }else if(targetDialog.id === 'dialog-form'){
          this.router.navigate(['/']);
       }
     }
  }




  openDialogDelete() {
    let dialogDelete = document.getElementById('dialog-delete');
    ((<HTMLElement>dialogDelete).style).display = 'block';
  }

  openDialogUpdate() {
    let dialogUpdate = document.getElementById('dialog-update');
    ((<HTMLElement>dialogUpdate).style).display  = 'block';
  }

  doDelete(nip : number) {
    this.httpService.deletePegawai(nip.toString(),()=>{
        this.connectorService.getSubject1.next('load');
        this.connectorService.clearCardInfo();
    });
  }

  doUpdate(nama : string , status : string) {

    let pegawaiUpdate = {
      nip : this.updateNIP,
      nama : nama,
      status : status
    };

    this.httpService.updatePegawai(pegawaiUpdate,()=>{
        this.connectorService.getSubject1.next('load');
        this.connectorService.clearCardInfo();
        document.getElementById('dialog-update').style.display = 'none';
    });
  }
}
