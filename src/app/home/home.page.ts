import { Component } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { Device } from '@capacitor/device';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  listShows: boolean = true;
  infos: any = [];
  constructor(
    private loadCtrl: LoadingController
  ) {
    this.getId();
    this.getInfo();
    this.getBatteryInfo();
    this.getLanguageCode(); 
  }

  async onScan(){
    const loading = await this.loadCtrl.create({
      message: 'Scanning Device Informations...',
      duration: 10000
    });
    loading.present();
    loading.dismiss().then((response) => {
      console.log('Total informations', this.infos, this.infos.length);
      if(this.infos.length > 0){
        this.listShows = false;
      }
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
    
  }
  async getId(){
    const Id = await Device.getId();
  }
  async getInfo(){
    const info = await Device.getInfo();
    this.addInformations(info);
  }
  async getBatteryInfo(){
    const info = await Device.getBatteryInfo();
    this.addInformations(info);
  }
  async getLanguageCode(){
    const info = await Device.getLanguageCode();
    this.addInformations(info);
  }
  addInformations(info:any){
    Object.keys(info).forEach((key) => {
      let item = {
        key: key,
        value: info[key]
      };
      this.infos.push(item);
    });
  }
}
