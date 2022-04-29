import axios from "axios";
import { useState } from "react";

export const useCharges = () => {
    const [countries, setCountries] = useState([]);
    const [departaments, setDepartaments] = useState([]);
    const getCountries = async () => {
        await axios.get('https://labs.patio.com.bo/pais/')
            .then(response => {
                setCountries(response.data)
            }).catch(error => {
                console.log(error);
            })
    }
    const getDepartaments = async (id) => {
        const formData = new FormData();
        formData.append('countryId', id);
        await axios.post('https://labs.patio.com.bo/pais/', formData)
            .then(response => {
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

