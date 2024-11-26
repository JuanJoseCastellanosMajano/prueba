import axios from 'axios';

// Configuración de la instancia de Axios
const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://reqres.in/api', // Usa la base URL desde el .env
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;




/*
*
// Función para crear un usuario
export const crearUsuario = async (payload) => {
  try {
    const response = await api.post('/users', payload); // Endpoint relativo
    return response.data; // Devuelve solo los datos
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error; // Lanza el error para que quien llame maneje la excepción
  }
};

// Función para obtener usuarios (GET)
export const obtenerUsuarios = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Función para actualizar un usuario (PUT)
export const actualizarUsuario = async (id, payload) => {
  try {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Función para eliminar un usuario (DELETE)
export const eliminarUsuario = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

*
* */
/*
*
import { crearUsuario, obtenerUsuarios } from './api';

// Crear un usuario
const nuevoUsuario = async () => {
  try {
    const usuario = await crearUsuario({ name: 'John', job: 'Developer' });
    console.log('Usuario creado:', usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// Obtener usuarios
const listarUsuarios = async () => {
  try {
    const usuarios = await obtenerUsuarios();
    console.log('Lista de usuarios:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

nuevoUsuario();
listarUsuarios();

* */