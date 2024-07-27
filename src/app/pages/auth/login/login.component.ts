import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalServicesService } from 'src/app/core/services/global-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginform!:FormGroup
  @ViewChild('inp') inp!:ElementRef
  constructor(private _api:GlobalServicesService, private _router:Router) { }

  ngOnInit() {
    const buttons:any = document.getElementsByClassName("matBtn");
    for (let button of buttons) {
    button.addEventListener("click", this._api.createRipple);
    }
    this.loginform = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
  }
  // focus
  @HostListener('click',['$event'])
  onFocus(event:any){
    if (this.inp.nativeElement.contains(event.target)) {
        document.getElementById('inpfocus')?.classList.add('inpfocus')
  }
  else{
    document.getElementById('inpfocus')?.classList.remove('inpfocus')
  }


  }
//login
login(){
  console.log(  this.loginform.value);
  this._router.navigateByUrl("/otp")

}



}
