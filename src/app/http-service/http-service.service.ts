import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


@Injectable()
export class HttpService{

  private  BASE_URL = "http://localhost/kuliah/pegawai/back-end";

  constructor(private httpClient : HttpClient){}

  loadData(callback : (jsonData : any) => void){
    this.httpClient.get(`${this.BASE_URL}/select.php`)
      .subscribe((value : any)=>{
          callback(value.pegawai);
      });
  }

  loadDataByNama(nama : string , callback : (jsonData : any) => void){
    this.httpClient.get(`${this.BASE_URL}/selectByNama.php`,
      {params : new HttpParams().set('nama',nama)})
      .subscribe((value : any)=>{
          callback(value.pegawai);
      });
  }



  updatePegawai(pegawai : {
    nip : string ,
    nama : string ,
    status : string
  } , callback : ()=>void){
    let requestBody = new URLSearchParams();

    requestBody.set('nip',pegawai.nip);
    requestBody.set('nama',pegawai.nama);
    requestBody.set('status',pegawai.status);

    this.httpClient
      .post(`${this.BASE_URL}/update.php`,requestBody.toString(),{
        headers : new HttpHeaders().set('Content-type','application/x-www-form-urlencoded'),
        responseType : "text"
      })
      .subscribe((value)=>{
        console.log(value);
        callback();
      },(error)=>{
        console.log(error);
      },()=>{
        console.log('Request Complete');
      });
  }

  insertPegawai(pegawai : {nip : number , nama : string ,status : string}){
    let requestBody = new URLSearchParams();

    requestBody.set('nip',pegawai.nip.toString());
    requestBody.set('nama',pegawai.nama);
    requestBody.set('status',pegawai.status);

    this.httpClient.post(`${this.BASE_URL}/insert.php`,requestBody.toString() , {headers : new HttpHeaders().set('Content-type','application/x-www-form-urlencoded') , responseType : "text"})
      .subscribe((value)=>{
          console.log(value);
      },(error)=>{
          console.log(error);
      },()=>{
          console.log('Request Complete');
      });
  }

  deletePegawai(nip : string , callback : ()=> void){
    this.httpClient.get(`${this.BASE_URL}/delete.php`,{params : new HttpParams().set('nip',nip) , responseType : "text"})
      .subscribe((value : any)=>{
        console.log(value);
        callback();
      },(error)=>{
        console.log(error);
      },()=>{
        console.log('Request Complete');
      });
  }

}

