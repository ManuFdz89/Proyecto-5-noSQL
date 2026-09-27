const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al obtener los cines', error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCinema = new Cinema(req.body);
        const savedCinema = await newCinema.save();
        return res.status(201).json(savedCinema);
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al crear el cine', error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cinemaToUpdate = new Cinema(req.body);
        cinemaToUpdate._id = id;

        const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaToUpdate, { new: true });
        if (cinemaUpdated) return res.status(200).json(cinemaUpdated);
        else return res.status(404).json('No se encontró el cine para actualizar');
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al modificar el cine', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);
        
        if (cinemaDeleted) return res.status(200).json(cinemaDeleted);
        else return res.status(404).json('No se encontró el cine para eliminar');
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al eliminar el cine', error: err });
    }
});

module.exports = router;