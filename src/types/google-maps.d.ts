declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
    }
}

declare namespace google {
    namespace maps {
        class Map {
            constructor(mapDiv: Element, opts?: MapOptions);
            panTo(latLng: LatLng | LatLngLiteral): void;
            fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
            getZoom(): number;
            setZoom(zoom: number): void;
        }

        class Marker {
            constructor(opts?: MarkerOptions);
        }

        class Polyline {
            constructor(opts?: PolylineOptions);
        }

        class LatLngBounds {
            constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
            extend(point: LatLng | LatLngLiteral): LatLngBounds;
        }

        interface MapOptions {
            center?: LatLng | LatLngLiteral;
            zoom?: number;
            mapTypeId?: string;
            disableDefaultUI?: boolean;
            gestureHandling?: string;
            zoomControl?: boolean;
            scrollwheel?: boolean;
            disableDoubleClickZoom?: boolean;
            draggable?: boolean;
            styles?: MapTypeStyle[];
        }

        interface MarkerOptions {
            position?: LatLng | LatLngLiteral;
            map?: Map;
            icon?: Symbol | string;
            label?: string | MarkerLabel;
        }

        interface MarkerLabel {
            text: string;
            color?: string;
            fontSize?: string;
            fontWeight?: string;
        }

        interface PolylineOptions {
            path?: Array<LatLng | LatLngLiteral>;
            geodesic?: boolean;
            strokeColor?: string;
            strokeOpacity?: number;
            strokeWeight?: number;
            map?: Map;
        }

        interface LatLng {
            lat(): number;
            lng(): number;
        }

        interface LatLngBoundsLiteral {
            east: number;
            north: number;
            south: number;
            west: number;
        }

        interface LatLngLiteral {
            lat: number;
            lng: number;
        }

        interface Symbol {
            path: any;
            fillColor?: string;
            fillOpacity?: number;
            strokeColor?: string;
            strokeWeight?: number;
            scale?: number;
        }

        interface MapTypeStyle {
            elementType?: string;
            featureType?: string;
            stylers?: Array<{ [key: string]: any }>;
        }

        enum SymbolPath {
            CIRCLE = 0
        }
    }
}

export { };
