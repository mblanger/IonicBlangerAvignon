import { Injectable } from '@angular/core';
import {File} from '@ionic-native/file';
import { Picture } from '../model/picture';

@Injectable()

export class FileService {

    constructor(public file: File) {

    }

    saveJsonData(picture: Picture) {
        this.file.createDir(this.file.externalApplicationStorageDirectory, "picturesData", true)
            .then(() => {
                this.file.writeFile(this.file.externalApplicationStorageDirectory + "/picturesData", picture.id + '.json', JSON.stringify(picture), {replace: true})
                    .then((res) => {
                        console.log("creation file saveJsonData: ");
                        console.log(res);
                        console.log(picture)
                    })
            })
    }

    getJsonData(id) {
        this.file.resolveDirectoryUrl(this.file.externalApplicationStorageDirectory + "/picturesData",).then((path) => {
            this.file.getFile(path, id + '.json', {}).then((file) => {
                file.file((file) => {
                    let reader = new FileReader();

                    reader.onloadend = function () {
                        console.log(this.result);
                    }
                    reader.readAsText(file);
                });
            })
        });
    }
}