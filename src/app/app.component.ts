import { Component, OnInit } from '@angular/core';
import { GlobalServicesService } from './core/services/global-services.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  closemenu = false
  constructor(private _api:GlobalServicesService) {
    
  }
  ngOnInit() {
  
    setTimeout(()=>{
    this._api.acceptOrder.next(true)
    },5000)

  }
  closeMenu(e:boolean){
      return e
  }
  logOut(){
    
  }
}
