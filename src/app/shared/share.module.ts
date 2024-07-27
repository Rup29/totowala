import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    OrderComponent
  ]
})
export class ShareModule { }
