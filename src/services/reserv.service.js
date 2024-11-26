import {Reserv} from '../models/reserv.model';
 import express from 'express';


const router = express.Router();

export const createReservation= async (req, res) => {
    try {
        const { id, quantity, sale, location, state, room } = req.body;

        const nuevaReserva = new Reservation({
            id,
            quantity,
            sale,
            location,
            state,
            room
        });

        const reservaGuardada = await nuevaReserva.save();
        res.status(201).json(reservaGuardada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva', detalles: error.message });
    }
};

export const findAllReservs = async (req, res) => {
    try {
        const reservas = await Reservation.find().populate('sale');
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas', detalles: error.message });
    }
};

export const changeState = async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;

        const reservaActualizada = await Reservation.findOneAndUpdate(
            { id },
            { state },
            { new: true } // Retorna el documento actualizado
        );

        if (!reservaActualizada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json(reservaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado', detalles: error.message });
    }
};

export const changeRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { room } = req.body;

        const reservaActualizada = await Reservation.findOneAndUpdate(
            { id },
            { room },
            { new: true }
        );

        if (!reservaActualizada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json(reservaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cuarto', detalles: error.message });
    }
};

export const findReserveById = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await Reservation.findOne({ id }).populate('sale');

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la reserva', detalles: error.message });
    }
};

export const findReserveByState = async (req, res) => {
    try {
        const { state } = req.params;

        const reservas = await Reservation.find({ state }).populate('sale');

        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las reservas', detalles: error.message });
    }
};
