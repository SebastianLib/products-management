import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5454", // Możesz użyć zmiennej środowiskowej
    headers: {
      "Content-Type": "application/json",
    },
  });