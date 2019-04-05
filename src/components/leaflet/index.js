import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import L from 'leaflet';
require('../../plugins/leaflet');

let map = null;

class Map extends React.Component {
    state = {
        map: null,
        markers: []
    }

    map = null;
    componentDidMount() {
        this.map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    setMapCenterAnimate(lat, lon, options) {
        let position = null;

        if (typeof lat.isArray === 'undefined') { //var lat can be array points
            position = [[lat, lon]];
        } else {
            position = lat;
        }

        let settings = {};

        if (options) {
            settings = {
                maxZoom: options.zoom ? options.zoom : 18,
                duration: typeof options.duration === 'number' ? options.duration : 2
            }
        }

        this.map.flyToBounds(position, settings);
    }


    markers = [];
    addMarker(options) {
        //throw new Error('Add marker debug');
        /*
        Example add
        mapContainer.addMarker({
            lat: ,
            lon: ,
            icon: -- icon url,
            configuration: -- object for additional options for marker,
            size: -- micro, mini, big or set x y sized,
            x: -- size x,
            y: -- size y,
            poupContent: -- html code for show info window marker,
            tooltip: {
                msg: -- text for tooltip,
                options: {
                    direction: 'bottom'
                }
            },
            click: function -- callback function click on marker,
            dragend: function (event) --  callback function drag on drop marker,
            animations: [{
                name: 'bounce', -- name animation
                options: { -- option for anim
                    times: 3
                }
             }],
             contextmenu: [{
                 text: 'element',
                 index: 0,
                 callback: function(){}
             }],
             notBindToMap: true -- Not show on map marker, need for cluster
             label: {
                text: -- name label
                options: {} -- other options
             }
        })
         */

        const markerOptions = {
            id: options.id
        };


        if (options) {
            markerOptions['name'] = options.name ? options.name : '';
        }

        const sizes = {
            micro: {
                x: 10,
                y: 10
            },
            mini: {
                x: 22,
                y: 32
            },
            medium: {
                x: 27,
                y: 40
            },
            big: {
                x: 34,
                y: 52
            }
        };

        let x = 0;
        let y = 0;

        if (options.size) {
            const size = sizes[options.size];
            if (!size) {
                throw new Error(`Undefined size setting: ${options.size}`)
            }
            x = size.x;
            y = size.y;
        }

        if (options.x) {
            x = options.x;
        }

        if (options.y) {
            y = options.y;
        }

        if (options.icon) {
            markerOptions['icon'] = L.icon({
                iconUrl: options.icon,
                iconSize: [x, y],
                iconAnchor: [x / 2, y],
                popupAnchor: [0, -30]
            });
        }

        if (options.contextmenu) {
            // markerOptions['contextmenu'] = self.isContexMenu;
            // markerOptions['contextmenuItems'] = options.contextmenu.map(function (item) {
            //     var newItem = item;
            //     if (newItem.callback) {
            //         newItem.callback(L);
            //     }
            //     return newItem;
            // });
        }

        if (!(options.lat && options.lon)) {
            options.lat = Number(options.lat);
            options.lon = Number(options.lon);
            if ((options.lat === 0) || (options.lon === 0)) {
                console.warn('Cannot add marker if lat or lon is 0');
                return;
            }
            console.error({
                text: 'Not found lat or lon in add marker options',
                options: options
            });
            return;
        }

        if (options.configuration) {
            Object.assign(markerOptions, options.configuration);
        }

        if (typeof options.dragend === 'function') {
            markerOptions['draggable'] = 'true';
            markerOptions['dragend'] = options.dragend;
        }

        const marker = L.marker([options.lat, options.lon], markerOptions);

        if (!options.notBindToMap) {
            marker.addTo(this.map);
        }

        marker.on('click', function () {
            if (options['click']) {
                options['click'](marker);
            }
        });

        marker.on('dragend', function (event) {
            if (this.options['dragend']) {
                this.options['dragend'](event.target, event);
            }
        });

        if (options.tooltip) {
            if (!options.tooltip.msg) {
                console.warn('Not bind tooltip. Msg is null');
            }
            marker.bindTooltip(options.tooltip.msg, options.tooltip.options);
        }

        marker.getLatLng = () => marker._latlng;

        marker.popup = null;
        marker.poupContent = null;

        marker.setPoupContent = function (text) {
            this.poupContent = text;
        }
        marker.poupContentSettings = {};

        marker.showPoup = function () {
            if (!this.poupContent) {
                console.warn('Poup content is null');
                return;
            }
            marker.popup = L.popup(this.poupContentSettings).setContent(this.poupContent);
            marker.popup.setLatLng(marker.getLatLng());
            this.map.openPopup(marker.popup);
            this.map.on('popupclose', function (e) {
                marker.poupClose();
            });
        }

        if (options.poupContent) {
            marker.poupContent = options.poupContent;
            marker.bindPopup(options.poupContent);
        }

        marker.beforeClose = function () {
            if (marker.popup) {
                this.map.closePopup(marker.popup);
            }
        }

        if (options.tooltip && !options.label) {
            marker.bindTooltip(options.tooltip);
        } else if (options.tooltip && options.label) {
            console.error('You cannot use tooltip and label together');
        } else if (options.label) {
            if (typeof options.label.text === 'string') {
                const labelOptions = {
                    permanent: true,
                    direction: "bottom"
                };
                marker.bindTooltip(options.label.text, Object.assign(labelOptions, options.label)).openTooltip();
            }
        }

        marker['focus'] = (zoom, duration) => {
            let settings = {};

            if (zoom) {
                settings['zoom'] = zoom;
            }

            if (duration) {
                settings['duration'] = duration;
            }

            this.setMapCenterAnimate(options.lat, options.lon, settings);
        }

        this.markers.push(marker);
        return marker;
    }
    deleteMarker(id) {
        if (!id) {
            console.error('Call function deleteMarker with id is null');
        }
        const marker = this.getMarker(id);
        if (marker) {
            this.removeLayer(marker);
            this.markers = this.markers.filter(marker => marker.options.id !== id);
        } else {
            console.error('markers not found. Id: ' + id);
        }
    }
    getMarker(id) {
        if (typeof id !== 'string') {
            console.warn('Id must be string');
        }
        const findMarker = this.markers.find(marker => marker.options.id === id)
        return findMarker ? findMarker : null;

    }
    removeAllMarkers() {
        this.markers.forEach( marker => this.removeLayer(marker));
        this.markers = [];
    }


    clusters = [];
    addCluster(markers, options) {
        if (!((typeof markers === 'object'))) {
            console.error('Call method addCluster. Argument markers not valid.');
            return;
        }

        const defaultSettings = {
            chunkedLoading: true
        };
        for (const key in options) {
            defaultSettings[key] = options[key];
        }

        const clusterLayer = L.markerClusterGroup(defaultSettings);

        this.markers.forEach(marker => {
            const findId = markers.find(clusterMarker => marker.option.id === clusterMarker.id);
            if (findId) {
                this.removeMarker(marker);
            }
        });

        markers.forEach(marker => {
            marker['notBindToMap'] = true;
            if (!((marker.lat > 0) && (marker.lon > 0))) {
                console.warn('Marker not adding. Error in options lat or lon', marker);
                return;
            }
            const findMarker = this.getMarker(marker.id);
            const addMarker = findMarker ? findMarker : this.addMarker(marker);
            if (addMarker) {
                throw new Error('Marker not create in method addMarker');
            }
            clusterLayer.addLayer(addMarker);
        })

        const cluster = {
            id: options.id,
            layer: clusterLayer
        };

        this.clusters.push(cluster);
        this.map.addLayer(clusterLayer);

        return cluster;
    }
    getCluster(id) {
        if (!id) {
            throw new Error('Call method getCluster. Argument id is null');
        }

        const find = this.clusters.find(cluster => cluster.id === id);
        if (find) {
            return find;
        } else {
            console.warn('Cluster with id' + id + ' not found');
            return null;
        }
    }
    removeCluster(id) {
        if (!id) {
            console.error('Call function removeCluster with id is null');
        }
        const cluster = this.getCluster(id);
        if (cluster) {
            this.removeLayer(cluster.layer);
            this.clusters = this.clusters.filter(cluster => cluster.id !== id);
        } else {
            console.error('Cluster not found. Id: ' + id);
        }
    }
    clearAllClusters() {
        this.clusters.forEach(cluster => this.removeLayer(cluster.layer));
        this.clusters = [];
    }




    render() {
        return (
            <div id="map" style={{height: '100%', width: '100%'}}></div>
        )
    }
}

export default Map;
