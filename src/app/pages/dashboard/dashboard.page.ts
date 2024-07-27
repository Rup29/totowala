import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { switchMap } from 'rxjs';
import { GlobalServicesService } from 'src/app/core/services/global-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  status = false
  contneeOrder!:boolean
  poikup = false
  payOnline = false
  payOfline = false;
  poikups = false;
  pickOtps = false;
  OtpV = false;
  complete = false;
  contneeOrders = true;
  constructor(private _api:GlobalServicesService) { }

  ngOnInit() {
    // this._api.continewOrder.subscribe((res)=>{
    //   this.contneeOrder = res
    // })
    setTimeout(()=>{
      this.contneeOrder = true
         this.contneeOrders = false
    },3000)
  }
// togle Status
statusTgl(){
  this.status = !this.status
}
rideContinew(){
const buttons:any = document.getElementsByClassName("matBtn");
for (let button of buttons) {  
button.addEventListener("click", this._api.createRipple);
}
this.poikup = true;
this._api.continewOrder.next(false);
this.poikups = true;
this.contneeOrder = false
}
confirmOtp(){
  const buttons:any = document.getElementsByClassName("matBtn");
for (let button of buttons) {  
button.addEventListener("click", this._api.createRipple);
}
}
onlinePay(){
 this.payOnline = true
 this.payOfline = false
}
offlinePay(){
  this.payOfline = true
  this.payOnline = false

}
pickOtp(){
  this.pickOtps = true
  this.poikups = false
}
confirmOtps(){
  this.OtpV = true;
  this.pickOtps = false
}
confirmOtpss(){
  this.OtpV = false;
  this.complete = true
}
confirmOtpssss(){
  this.complete = false;
  this.contneeOrders = true
}
}
