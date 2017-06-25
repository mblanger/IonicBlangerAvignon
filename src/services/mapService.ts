import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Picture } from '../model/picture';
import { UuidService } from '../services/uuidService';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker,
} from '@ionic-native/google-maps';

@Injectable()

export class MapService {

    constructor(public geolocation: Geolocation, public googleMaps: GoogleMaps, public uuid: UuidService) {

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

    locatingPicture() {
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                let id: string = this.uuid.generate();
                let lat: number = resp.coords.latitude;
                let long: number = resp.coords.longitude;
                let picture =  new Picture(id, lat, long);
                if(picture)
                    resolve(picture)
                else
                    reject("Erreur")
            })
        })
    }

    setPosition(map, lat: number, long: number) {
        let ionic: LatLng = new LatLng(lat, long);
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