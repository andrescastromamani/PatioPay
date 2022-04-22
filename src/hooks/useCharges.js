import axios from "axios";
import { useState } from "react";

export const useCharges = () => {
    const [countries, setCountries] = useState();
    const [departaments, setDepartaments] = useState();
    const getCountries = async () => {
        await axios.get('https://labs.patio.com.bo/pais/')
            .then(response => {
                setCountries(response.data)
            }).catch(error => {
                console.log(error);
            })
    }
    const getDepartaments = async (id) => {
        console.log(id);
        const formData = new FormData();
        formData.append('countryId', id);
        await axios.post('https://labs.patio.com.bo/pais/', formData)
            .then(response => {
                console.log(response.data);
                setDepartaments(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return {
        countries,
        departaments,
        getCountries,
        getDepartaments
    }
}

