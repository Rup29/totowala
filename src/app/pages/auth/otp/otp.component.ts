import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import {AlertController} from "@ionic/angular";
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/core/services/global-services.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent  implements OnInit {
  otpForm!:FormGroup;
  timecount:any
  url="assets/images/checke.png"
  constructor(private _api:GlobalServicesService, private _alart:AlertController, private _router:Router ) { }

  ngOnInit() {
    // mat button
    const buttons:any = document.getElementsByClassName("matBtn");
    for (let button of buttons) {
    button.addEventListener("click", this._api.createRipple);
    }
    this.otpForm = new FormGroup({
      firstopt: new FormControl('',[Validators.required]),
      secendotp: new FormControl('',[Validators.required]),
      therdotp: new FormControl('',[Validators.required]),
      foreotp: new FormControl('',[Validators.required])
    })
  }
// otp
  async onOtp(){
 console.log(this.otpForm.value);
 const alert= await this._alart.create({

   header: " ",
   subHeader: "Congratulations",
   message:"You account is ready to use. You will be redirected to the home page in a few seconds",
   cssClass:"sucessModal",
  
   buttons: [
     {
       text: "ok",
       handler: () => {
        this._router.navigateByUrl('/dashboard')
    }
       
     }
   ]
 })

  alert.present();
}
// setautoFocus
move(e:any, p:any, c:any, n:any){
  var length = c.value.length
  console.log(length);
  
  var maxlenght = c.getAttribute('maxlength')
  console.log(maxlenght);
  if(length == maxlenght ){
    n.focus();
  }
}
// resendOtp
resendOtp(){
  let counter = interval(1000)
  counter.subscribe(res=> this.timecount = res)
}
}
