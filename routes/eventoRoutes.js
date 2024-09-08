// routes/eventoRoutes.js
const express = require('express');
const Evento = require('../models/Evento');

const router = express.Router();

// Listar todos os eventos
router.get('/eventos', (req, res) => {
    Evento.listarTodos((err, eventos) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar eventos' });
        }
        res.json(eventos);
    });
});

// Buscar evento por ID
router.get('/eventos/:id', (req, res) => {
    const { id } = req.params;
    Evento.buscarPorId(id, (err, evento) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar evento' });
        }
        if (!evento) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        res.json(evento);
    });
});

// Criar novo evento
router.post('/eventos', (req, res) => {
    const novoEvento = req.body;
    Evento.criar(novoEvento, (err, eventoCriado) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar evento' });
        }
        res.status(201).json(eventoCriado);
    });
});

// Atualizar evento existente
router.put('/eventos/:id', (req, res) => {
    const { id } = req.params;
    const eventoAtualizado = req.body;
    Evento.atualizar(id, eventoAtualizado, (err, evento) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar evento' });
        }
        res.json(evento);
    });
});

// Deletar evento
router.delete('/eventos/:id', (req, res) => {
    const { id } = req.params;
    Evento.deletar(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar evento' });
        }
        res.status(204).send();
    });
});

module.exports = router;
