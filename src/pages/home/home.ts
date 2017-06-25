import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {File} from '@ionic-native/file';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [File]
})
export class HomePage {

    public pictures = [];

  constructor(public navCtrl: NavController, public file: File) {
    this.viewPictures();
  }

  viewPictures(){

      this.file.listDir(this.file.externalApplicationStorageDirectory, "pictures").then((res) => {
          res.map((item) => {
              console.log(item.nativeURL)
              this.pictures.push(item.nativeURL);
          })
      });
  }

}
