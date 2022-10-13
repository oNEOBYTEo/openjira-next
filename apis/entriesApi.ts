import axios from 'axios';

const entriesApi = axios.create({
  baseURL: 'https://openjira-next.vercel.app/api',
});

export default entriesApi;
