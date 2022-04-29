import axios from "axios";
import { useState } from "react"

export const useClients = () => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getClients = async () => {
        const response = await axios.get('http://localhost:4000/clients');
        setClients(response.data);
    }
    const searchClients = (e) => {
        let matches = [];
        if (e.target.value !== '') {
            matches = clients.filter(client =>
                client.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
        }
        setSuggestions(matches);
        setSearch(e.target.value);
    }
    const selectClient = (client) => {
        setSearch(client.name);
        setSuggestions([]);
    }
    return {
        clients,
        search,
        suggestions,
        getClients,
        searchClients,
        selectClient
    }
}
