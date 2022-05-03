import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useDetails = () => {
    const [details, setDetails] = useState([]);
    const addDetail = () => {
        setDetails([
            ...details,
            {
                id: uuidv4(),
                detail: '',
                quantity: '',
                amount: ''
            }]);
    }
    const handleChangeDetails = (e, index) => {
        const detailInput = details.map((i) => {
            if (i.id === index) {
                i[e.target.name] = e.target.value;
            }
            return i;
        })
        setDetails(detailInput);
    }
    return {
        details,
        addDetail,
        handleChangeDetails
    };
}
