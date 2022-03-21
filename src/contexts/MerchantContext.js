import { createContext, useEffect, useState } from 'react'
import { data } from '../data/data'

export const MerchantContext = createContext();

export const MerchantContextProvider = ({ children }) => {
    const [merchants, setMerchants] = useState(data);
    useEffect(() => {
        setMerchants(JSON.parse(localStorage.getItem('merchants')) || data);
    }, []);
    useEffect(() => {
        localStorage.setItem('merchants', JSON.stringify(merchants));
    })
    const addMerchant = (merchant) => {
        setMerchants([...merchants, merchant])
    }
    const updateMerchant = (id, updatedMerchant) => {
        setMerchants(merchants.map(merchant => (merchant.id === id ? updatedMerchant : merchant)))
    }
    const deleteMerchant = (id) => {
        setMerchants(merchants.filter(merchant => merchant.id !== id))
    }
    return (
        <MerchantContext.Provider value={{
            merchants,
            setMerchants,
            addMerchant,
            updateMerchant,
            deleteMerchant
        }}>
            {children}
        </MerchantContext.Provider>
    )
}


