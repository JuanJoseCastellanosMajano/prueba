import {Client} from '../models/client.model'
import express from "express";


const router = express.Router();

export const createClient = async(req, res) => {
    try {
        const { id, name, user, email } = req.body;

        const newClient = new Client({
            id,
            name,
            user,
            email
        });

        const savedClient = await newClient.save();
        return { success: true, client: savedClient };
    } catch (error) {
        return { success: false, error: `Error al crear el cliente: ${error.message}` };
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await Client.findOneAndDelete({id});

        if (!deletedClient) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente eliminado con éxito', client: deletedClient });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente', detalles: error.message });
    }
};

export const findAllClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('user');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes', detalles: error.message });
    }
};

export const findClientById = async (req, res) =>  {
    try {
        const { id } = req.params;
        const client = await Client.findOne({ id }).populate('client');

        if (!client) {
            return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
        }
        res.json(client);
        } catch (error) {
        res.status(500).json({ error: 'Error al buscar el cliente', detalles: error.message });
    }
};

export const updateClient = async (req, res) => {
    const clientId = req.params.id;
    const updateData = req.body;

    Client.findOneAndUpdate({ id: clientId }, updateData, { new: true })
        .then((updatedClient) => {
            if (!updatedClient) {
                return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
            }
            res.status(200).json({ success: true, client: updatedClient });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: `Error al actualizar el cliente: ${error.message}` });
        });
};
