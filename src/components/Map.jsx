import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';
import { Search } from './Search';

const containerStyle = { height: '500px' };
const libraries = ["places"];

export const Map = ({ marker, setMarker }) => {
    const onPinDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log(lat, lng);
        setMarker({ lat, lng });
    }
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    });
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;
    return (
        <div className="modal fade" id="map" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Map</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <p>Buscar Ubicacion</p>
                            </div>
                            <div className="col-12 col-md-9">
                                <Search panTo={panTo} marker={marker} setMarker={setMarker} />
                            </div>
                        </div>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={marker}
                            zoom={14}
                            onLoad={onMapLoad}
                        >
                            <Marker
                                position={marker}
                                draggable={true}
                                onDragEnd={onPinDragEnd}
                            />
                        </GoogleMap>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
