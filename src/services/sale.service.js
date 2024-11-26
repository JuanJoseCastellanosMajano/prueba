import express from 'express';
import {Sales} from '../models/sale.model';

const router = express.Router();

export const createSale = async (req, res) => {
    try {
        const { id, client, total, services, state } = req.body;

        const nuevaVenta = new Sales({
            id,
            client,
            total,
            services,
            state
        });

        const ventaGuardada = await nuevaVenta.save();
        res.status(201).json(ventaGuardada);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta', detalles: error.message });
    }
};

export const findAllSales = async (req, res) => {
    try {
        const ventas = await Sales.find().populate('client'); // Incluye detalles del cliente
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas', detalles: error.message });
    }
};

export const findSellsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const fechaInicio = new Date(date);
        const fechaFin = new Date(date);
        fechaFin.setUTCHours(23, 59, 59, 999);

        const ventas = await Sales.find({
            date: {
                $gte: fechaInicio,
                $lte: fechaFin
            }
        }).populate('client');

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las ventas por fecha', detalles: error.message });
    }
};

export const changeState = async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;

        const ventaActualizada = await Sales.findOneAndUpdate(
            { id },
            { state },
            { new: true } // Retorna el documento actualizado
        );

        if (!ventaActualizada) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado', detalles: error.message });
    }
};

export const findSalesByState = async (req, res) => {
    try {
        const { state } = req.params;

        const ventas = await Sales.find({ state }).populate('client');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las ventas', detalles: error.message });
    }
};

export const findAllSalesByClient = async (req, res) => {
    try {
        const { clientId } = req.params;

        const ventas = await Sales.find({ client: clientId }).populate('client');

        if (ventas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron ventas para este cliente' });
        }

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar ventas por cliente', detalles: error.message });
    }
};

export const deleteSaleById = async (req, res) => {
    try {
        const { id } = req.params;

        const ventaEliminada = await Sales.findOneAndDelete({ id });

        if (!ventaEliminada) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        res.json({ message: 'Venta eliminada con éxito', venta: ventaEliminada });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta', detalles: error.message });
    }
};
