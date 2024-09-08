// models/Evento.js
const connection = require('../db'); // Importa a conexão com o banco de dados

class Evento {
    constructor(id, nome, local, data, descricao, quantidadeIngressos, preco) {
        this.id = id;
        this.nome = nome;
        this.local = local;
        this.data = data;
        this.descricao = descricao;
        this.quantidadeIngressos = quantidadeIngressos;
        this.preco = preco;
    }

    static listarTodos(callback) {
        connection.query('SELECT * FROM evento', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static buscarPorId(id, callback) {
        connection.query('SELECT * FROM evento WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    static criar(novoEvento, callback) {
        const { nome, local, data, descricao, quantidadeIngressos, preco } = novoEvento;
        connection.query(
            'INSERT INTO evento (nome, local, data, descricao, quantidade_ingressos, preco) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, local, data, descricao, quantidadeIngressos, preco],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, { id: results.insertId, ...novoEvento });
            }
        );
    }

    static atualizar(id, eventoAtualizado, callback) {
        const { nome, local, data, descricao, quantidadeIngressos, preco } = eventoAtualizado;
        connection.query(
            'UPDATE evento SET nome = ?, local = ?, data = ?, descricao = ?, quantidade_ingressos = ?, preco = ? WHERE id = ?',
            [nome, local, data, descricao, quantidadeIngressos, preco, id],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, { id, ...eventoAtualizado });
            }
        );
    }

    static deletar(id, callback) {
        connection.query('DELETE FROM evento WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = Evento;
