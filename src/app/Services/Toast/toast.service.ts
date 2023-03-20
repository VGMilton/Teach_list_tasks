import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastCtrl:ToastController) {
    this.toastCtrl=toastCtrl;
  }
  async showErrorToast(mensaje:string){
    const toast = await this.toastCtrl.create({
      message:mensaje,
      duration:1500,
      position:"bottom",
      color: "danger",
      icon:"remove-circle-outline",
      animated:true,
    });
    await toast.present();
  }
}
