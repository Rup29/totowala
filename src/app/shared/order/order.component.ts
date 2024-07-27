import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Subscription, interval, map, take } from 'rxjs';
import { GlobalServicesService } from 'src/app/core/services/global-services.service';
import {NativeAudio} from '@capacitor-community/native-audio'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent  implements OnInit {
  isOrder!:boolean
  intervalTime:any
  revarsCount:number = 30
  revSub!:Subscription
  constructor(private _api:GlobalServicesService) { 
    this.callSound();
  }

  ngOnInit() {
 
    this._api.acceptOrder.subscribe((res)=>{
      this.isOrder = res;

       if(this.isOrder){
        this.playSound();
        const orderinterval = interval(1000)
           this.revSub = orderinterval.pipe(take(31)).subscribe((res)=>{
          this.revarsCount = res;
          console.log(res);
          if(res >= 30){
            this.revSub.unsubscribe()
           this._api.acceptOrder.next(false)
          }
        })
      orderinterval.pipe(take(31),map(res=>res*3.33)).subscribe((res)=>{
          this.intervalTime = res
        })
       }

    })
  }

  async callSound(){
    await NativeAudio.preload({
      assetId: "notification",
      assetPath: "toto.mp3",
      audioChannelNum: 1,
      isUrl: false
  });
  }
  // async playSound(){
  //   await  NativeAudio.play({
  //     assetId: 'notification',
  //     // time: 6.0 - seek time
  // }).then(res=>{
  //   console.log(res);
    
  // }).catch(err=>{
  //   console.log(err);
    
  // })
  // NativeAudio.loop({
  //   assetId: 'notification',
  // });
  // }

  async playSound() {
    try {
      const res = await NativeAudio.play({
        assetId: 'notification',
        // time: 6.0 - seek time (if applicable)
      });
      console.log(res);
  
      await NativeAudio.loop({
        assetId: 'notification',
      });
    } catch (err) {
      console.log(err);
    }
  }


async cancelOrder(){
 await NativeAudio.stop({
     assetId: 'notification',
   });
  
    this.revSub.unsubscribe()
    this._api.acceptOrder.next(false);


  }
  async acceptOrder(){
  // await NativeAudio.stop({
  //   assetId: 'notification',
  // });
   
    this.revSub.unsubscribe()
    this._api.acceptOrder.next(false)
    this._api.continewOrder.next(true)
 
  }
}
