import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectorComponentService} from "./connector-service/connector-component.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{


  constructor(/*private activatedRoute: ActivatedRoute */private router : Router , private connectorService : ConnectorComponentService){

  }

  ngOnInit(): void {

  }



  home() {
    this.router.navigate(['/']);
    this.connectorService.clearCardInfo();
  }
}
