import Manager from '../models/manager';
import express from "express";

const router = express.Router();

export const createManager = async(req, res) => {
    try {
        const { id, name, user } = req.body;

        const newManager = new Manager({
            id,
            name,
            user
        });

        const savedManager = await newManager.save();
        return { success: true, manager: savedManager };
    } catch (error) {
        return { success: false, error: `Error al crear el manager: ${error.message}` };
    }
}

export const deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedManager = await Manager.findOneAndDelete({id});

        if (!deletedManager) {
            return res.status(404).json({ error: 'Manager no encontrado' });
        }

        res.json({ message: 'Manager eliminado con éxito', client: deletedClient });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Manager', detalles: error.message });
    }
};

export const updateManager = async (req, res) => {
    const managerId = req.params.id;
    const updateData = req.body;

    Client.findOneAndUpdate({ id: managerId }, updateData, { new: true })
        .then((updatedManager) => {
            if (!updatedManager) {
                return res.status(404).json({ success: false, error: 'Manager no encontrado' });
            }
            res.status(200).json({ success: true, client: updatedManager });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: `Error al actualizar el Manager: ${error.message}` });
        });
};

export const findManagerById = async (req, res) =>  {
    try {
        const { id } = req.params;
        const manager = await Manager.findOne({ id }).populate('manager');

        if (!manager) {
            return res.status(404).json({ success: false, error: 'Manager no encontrado' });
        }
        res.json(manager);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el manager', detalles: error.message });
    }
};