const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies);
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al obtener las películas', error: err });
	}
});

router.get('/id/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (movie) return res.status(200).json(movie);
		else return res.status(404).json('No se ha encontrado ninguna película con este ID');
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error interno del servidor', error: err });
	}
});

router.get('/title/:title', async (req, res) => {
	try {
		const movieByTitle = await Movie.find({ title: req.params.title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al buscar por título', error: err });
	}
});

router.get('/genre/:genre', async (req, res) => {
	try {
		const movieByGenre = await Movie.find({ genre: req.params.genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al buscar por género', error: err });
	}
});

router.get('/year/:year', async (req, res) => {
	try {
		const movieByYear = await Movie.find({ year: { $gte: req.params.year } });
		return res.status(200).json(movieByYear);
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al buscar por año', error: err });
	}
});

router.post('/', async (req, res) => {
	try {
		const newMovie = new Movie(req.body);
		const savedMovie = await newMovie.save();
		return res.status(201).json(savedMovie);
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al crear la película', error: err });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const movieToUpdate = new Movie(req.body);
		movieToUpdate._id = id;

		const movieUpdated = await Movie.findByIdAndUpdate(id, movieToUpdate, { new: true });
		if (movieUpdated) return res.status(200).json(movieUpdated);
		else return res.status(404).json('No se encontró la película para actualizar');
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al modificar la película', error: err });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const movieDeleted = await Movie.findByIdAndDelete(id);
		
		if (movieDeleted) return res.status(200).json(movieDeleted);
		else return res.status(404).json('No se encontró la película para eliminar');
	} catch (err) {
		return res.status(500).json({ mensaje: 'Error al eliminar la película', error: err });
	}
});

module.exports = router;