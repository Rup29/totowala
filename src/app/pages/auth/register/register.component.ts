import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalServicesService } from 'src/app/core/services/global-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  register!:FormGroup
  @ViewChild('inp') inp!:ElementRef
  constructor(private _api:GlobalServicesService, private _router:Router) {

   }

  ngOnInit() {
    const buttons:any = document.getElementsByClassName("matBtn");
    for (let button of buttons) {
    button.addEventListener("click", this._api.createRipple);
    }
    this.register = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    })
  }
  @HostListener('click',['$event'])
  onFocus(event:any){
    if (this.inp.nativeElement.contains(event.target)) {
        document.getElementById('inpfocus')?.classList.add('inpfocus')
  }
  else{
    document.getElementById('inpfocus')?.classList.remove('inpfocus')
  }


  }
  onRegister(){
    console.log( this.register.value );
    this._router.navigateByUrl('/otp')
  }
  
}
