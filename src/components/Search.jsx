import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export const Search = ({ panTo, marker, setMarker }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => marker.lat,
                lng: () => marker.lng
            },
            radius: 200 * 1000,
        }
    });
    return (
        <div className="mb-3">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        const { formatted_address } = results[0];
                        console.log(lat, lng, formatted_address);
                        panTo({ lat, lng });
                        setMarker({
                            lat: lat,
                            lng: lng
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <ComboboxInput
                    className="form-control"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Ingresar Ubicación"
                />
                <ComboboxPopover >
                    <ComboboxList className="merchantSearch">
                        {
                            status === "OK" && data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))
                        }
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
