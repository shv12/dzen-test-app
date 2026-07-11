import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '', // Empty defaults to Next.js origin
  headers: {
    'Content-Type': 'application/json',
  },
});