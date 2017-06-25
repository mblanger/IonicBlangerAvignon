import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import { Picture } from '../model/picture';

@Injectable()
export class PictureService {

    constructor(public file: File){

    }

    savePicture(picture: Picture, imageData: string) {
        this.file.createDir(this.file.externalApplicationStorageDirectory, "pictures", true)
            .then((res) => {
                let blob = this.b64toBlob(imageData, "image/jpeg", 512)
                this.file.writeFile(this.file.externalApplicationStorageDirectory + "/pictures", picture.id + '.jpeg', blob, {replace: true})
                    .then((res) => {
                        console.log("creation file savePicture : ");
                        console.log(res);
                        console.log(picture)
                        //this.saveJsonData();
                    })
            });
    }

    b64toBlob(b64Data, contentType, sliceSize) {

        let byteCharacters = atob(b64Data);

        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);

        }

        let blob = new Blob(byteArrays, {type: contentType});

        return blob;
    }
}