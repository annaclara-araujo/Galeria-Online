import axios from "axios";

const apiPorta = "7056";

//apiLocal recebe o endereco da API
const apiLocal = `https://localhost:${apiPorta}/api/`;

const api = axios.create({
    baseURL: apiLocal
});

export default api;