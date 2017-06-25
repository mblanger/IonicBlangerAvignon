import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';

import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker,
} from '@ionic-native/google-maps';
import {File} from '@ionic-native/file';


@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: [Camera, Geolocation, GoogleMaps, File]
})
export class AboutPage {
    public loadImg: string;
    private imageData: string;
    public picture = {
        id: '',
        title: '',
        lat: 0,
        long: 0
    };


    constructor(public navCtrl: NavController,
                public camera: Camera,
                public geolocation: Geolocation,
                public googleMaps: GoogleMaps,
                public file: File) {

    }

    uuid() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    savePicture() {
        this.file.createDir(this.file.externalApplicationStorageDirectory, "pictures", true)
            .then((res) => {
                let blob = this.b64toBlob(this.imageData, "image/jpeg", 512)
                this.file.writeFile(this.file.externalApplicationStorageDirectory + "/pictures", this.picture.id + '.jpeg', blob, {replace: true})
                    .then((res) => {
                        console.log("creation file savePicture : ");
                        console.log(res);
                        console.log(this.picture)
                        this.saveJsonData();
                    })
            });
    }

    saveJsonData() {
        this.file.createDir(this.file.externalApplicationStorageDirectory, "picturesData", true)
            .then(() => {
                this.file.writeFile(this.file.externalApplicationStorageDirectory + "/picturesData", this.picture.id + '.json', JSON.stringify(this.picture), {replace: true})
                    .then((res) => {
                        console.log("creation file saveJsonData: ");
                        console.log(res);
                        console.log(this.picture)
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

    takePicture() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000,
            saveToPhotoAlbum: true,
            encodingType: this.camera.EncodingType.JPEG,
        }).then((imageData) => {
            this.locating();
            this.loadImg = "data:image/jpeg;base64," + imageData;
            this.imageData = imageData;
            this.picture.id = this.uuid();
        }, (err) => {
            console.log(err);
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

    locating() {
        console.log(this.geolocation);
        let map = this.loadMap();
        console.log(map)
        this.geolocation.getCurrentPosition().then((resp) => {
            this.picture.lat = resp.coords.latitude;
            this.picture.long = resp.coords.longitude;
            this.setPosition(map);
        }).catch((error) => {
            console.log("error");
        });
    }

    loadMap() {
        let element: HTMLElement = document.getElementById('map');
        let map: GoogleMap = this.googleMaps.create(element);
        map.one(GoogleMapsEvent.MAP_READY).then(
            () => {
                console.log('Map is ready!');
            }
        );
        return map;
    }

    setPosition(map) {
        let ionic: LatLng = new LatLng(this.picture.lat, this.picture.long);
        let position: CameraPosition = {
            target: ionic,
            zoom: 12,
            tilt: 30
        };

        this.geolocation.getCurrentPosition().then((resp) => {

            map.moveCamera(position);
            // create new marker
            let markerOptions: MarkerOptions = {
                position: ionic
            };

            let lmarker: Marker;

            map.addMarker(markerOptions)
                .then((marker: Marker) => {
                    lmarker = marker;
                    marker.showInfoWindow();
                });
        })
    }
}
