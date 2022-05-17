import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useDetails = () => {
    const [detailErrors, setDetailErrors] = useState([]);
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
        console.log(e.target.value);
        const detailInput = details.map((i) => {
            if (i.id === index) {
                i[e.target.name] = e.target.value;
            }
            return i;
        })
        setDetails(detailInput);
    }
    const validateDetails = (details) => {
        const errors = {};
        details.forEach(detail => {
            if (!detail.detail) {
                errors.detail = 'Detail is required';
            }
            if (!detail.quantity) {
                errors.quantity = 'Quantity is required';
            }
            if (!detail.amount) {
                errors.amount = 'Amount is required';
            }
        })
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
