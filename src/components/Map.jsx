import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';
import Search from './Search';
const containerStyle = {
    height: '500px'
};
const libraries = ["places"];

const Map = ({ id, marker, setMarker }) => {
    const onPinDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log(lat, lng);
        setMarker({ lat, lng });
    }
    const handleClickDone = (e) => {
        document.querySelector('#address').click();
        document.querySelector('#lat').click();
        document.querySelector('#lng').click();
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
        <>
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id={id}>
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Address</h5>
                            <button type="button" className="btn-close" data-bs-toggle="modal" href="#newstore" role="button" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <div className="row">
                                <div className="col-12 col-md-2">
                                    <p>Search Location</p>
                                </div>
                                <div className="col-12 col-md-10">
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
                                    position={
                                        marker
                                    }
                                    draggable={true}
                                    onDragEnd={onPinDragEnd}
                                />
                            </GoogleMap>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-one" data-bs-toggle="modal" href="#newstore" role="button" onClick={handleClickDone} >Done</button>
                            <button type="button" className="btn btn-two"
                                data-bs-toggle="modal" href="#newstore" role="button"
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map
