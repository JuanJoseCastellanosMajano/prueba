import Service from './service';
import express from "express";


const router = express.Router();

export const createService = async(req, res) => {
    try {
        const { id,image, name, description,tag,price,max_capacity,isExtra } = req.body;

        const newService = new Service({
            id,
            image,
            name,
            description,
            tag,
            price,
            max_capacity,
            isExtra
        });

        const savedService = await newService.save();
        return { success: true, client: savedService };
    } catch (error) {
        return { success: false, error: `Error al crear el servicio: ${error.message}` };
    }
};

export const findAllServices = async (req, res) => {
    try {
        const services = await Services.find().populate('services');
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios', detalles: error.message });
    }
};

export const findServicesById = async (req, res) =>  {
    try {
        const { id } = req.params;
        const services = await Client.findOne({ id }).populate('services');

        if (!services) {
            return res.status(404).json({ success: false, error: 'Servicio no encontrado' });
        }
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el servicio', detalles: error.message });
    }
};

export const findServicesByName = async (req, res) =>  {
    try {
        const { name } = req.params;
        const services = await Client.findOne({ id }).populate('services');

        if (!services) {
            return res.status(404).json({ success: false, error: 'Servicio no encontrado' });
        }
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el servicio', detalles: error.message });
    }
};


