import axios from 'axios';

const apiReceitaWs = axios.create({
  baseURL: 'https://www.receitaws.com.br/v1/cnpj',
});

export default apiReceitaWs;
