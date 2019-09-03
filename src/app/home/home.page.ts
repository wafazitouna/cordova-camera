import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgProgress } from '@ngx-progressbar/core';
import { TesseractWorker } from 'tesseract.js';

import { NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentImage: any;
  imageText='';
  loading=false;
  constructor(public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, 
    public progress: NgProgress) {}
takePhoto(){
  const options: CameraOptions = {
    quality: 100,
    allowEdit: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera.getPicture(options).then((imageData) => {
    this.currentImage = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    // Handle error
    console.log("Camera issue:" + err);
  });
}
  recognizeImage(){
    const worker = new TesseractWorker();
    console.log(this.currentImage);

    worker
      .recognize(this.currentImage)
      .progress((p) => {
        console.log('progress', p);
        this.loading=true;
      })
      .then(({ text }) => {
        this.loading = false;
        console.log(text);
        this.imageText=text;
        worker.terminate();
      });
    // worker.recognize('https://www.text100.com/wp-content/uploads/2016/10/logo.jpg')
    //   .progress(message => {
    //    // if (message.status === 'recognizing text')
    //    // this.progress.set(message.progress);
    //       console.log(message.progress);
       
    //   })
    //   .catch(err => console.error(err))
    //   .then(result => {
    //     this.imageText = result.text;
    //   })
    //   .finally(resultOrError => {
    //     worker.terminate();
    //   });
  }
  }

