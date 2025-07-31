import { useKeycloak } from '@/keycloak/keycloakContext';
import axios, { AxiosInstance } from 'axios';
import { useEffect, useRef } from 'react';

export const useAxiosWithAuth = (): AxiosInstance => {
  const {keycloak} = useKeycloak();
  const axiosInstance = useRef(axios.create());

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.current.interceptors.request.use(
      (config) => {
        if (keycloak?.token) {
          config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor (optional)
    const responseInterceptor = axiosInstance.current.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          keycloak?.logout(); // Handle unauthorized errors
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.current.interceptors.request.eject(requestInterceptor);
      axiosInstance.current.interceptors.response.eject(responseInterceptor);
    };
  }, [keycloak]);

  return axiosInstance.current;
};