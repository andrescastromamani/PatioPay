import { useState } from "react";

export const useMerchantFilter = () => {
    const [search, setSearch] = useState('');
    const filterSearch = (data) => {
        return data.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.city.toLowerCase().includes(search.toLowerCase()) ||
                item.phone.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.address.toLowerCase().includes(search.toLowerCase()) ||
                item.status.toLowerCase().includes(search.toLowerCase()) ||
                item.payment_method.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
        })
    }
    const filterCategory = (data) => {
        return data.filter(item => {
            return item.category.toLowerCase().includes(category.toLowerCase());
        })
    }
    return {
        search,
        setSearch,
        filterSearch,
        filterCategory
    }
}
