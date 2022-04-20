import axios from "axios";

export const getCountries = () => {
    return async (dispatch) => {
        await axios.get('https://labs.patio.com.bo/pais/')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };
}