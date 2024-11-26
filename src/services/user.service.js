import User from '../models/user';
import express from "express";

const router = express.Router();

export const createUser = async (req, res) => {
    try{
        const { id, phone } = req.body;

        const newClient = new Client({
            id,
            phone
        });

        const savedUser = await newUser.save();
        return { success: true, client: savedUser };
    } catch (error) {
        return { success: false, error: `Error al crear el usuario: ${error.message}` };
    }
};

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({id}).populate('user');

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }
        res.json(user);
    }catch (error){
        res.status(500).json({ error: 'Error al buscar el cliente', detalles: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findOneAndDelete({id});

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado con éxito', client: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario', detalles: error.message });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    Client.findOneAndUpdate({ id: userId }, updateData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
            }
            res.status(200).json({ success: true, client: updatedClient });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: `Error al actualizar el usuario: ${error.message}` });
        });
}


