import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useDetails = () => {
    const [details, setDetails] = useState([]);
    const [detailErrors, setDetailErrors] = useState([]);
    const addDetail = () => {
        setDetails([
            ...details,
            {
                id: uuidv4(),
                detail: '',
                quantity: '',
                unitprice: '',
                amount: ''
            }]);
    }
    const removeDetail = (id) => {
        setDetails(details.filter(detail => detail.id !== id));
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
    const handleBlurDetails = (e, index) => {
        console.log(index);
        console.log(e.target.value);
        const detailInput = details.map((i) => {
            if (i.id === index) {
                i[e.target.name] = e.target.value;
            }
            return i;
        })
        setDetails(detailInput);
    }
    const validateDetails = () => {
        const errors = [];
        details.map((detail) => {
            if (detail.detail === '') {
                errors.push({
                    id: detail.id,
                    error: 'Detail is required'
                });
            }
            if (detail.quantity === '') {
                errors.push({
                    id: detail.id,
                    error: 'Quantity is required'
                });
            }
            if (detail.unitprice === '') {
                errors.push({
                    id: detail.id,
                    error: 'Unit price is required'
                });
            }
            if (detail.amount === '') {
                errors.push({
                    id: detail.id,
                    error: 'Amount is required'
                });
            }
        })
        console.log(errors);
        setDetailErrors(errors);
    }
    return {
        details,
        detailErrors,
        addDetail,
        removeDetail,
        handleChangeDetails,
        handleBlurDetails,
        validateDetails
    };
}
