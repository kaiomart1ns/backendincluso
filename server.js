const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// sessões
app.use(session({
    secret: 'secreta',
    resave: false,
    saveUninitialized: true
}));

// arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//  visualização ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// eventos
const eventos = [
    { id: 1, nome: 'Matheus e Kauan / MC Ryan SP', data: '2024-09-13', local: 'Rancho Quarto de Milha', preco: 170, descricao: 'FRONTSTAGE - Um incrível show da dupla mais amada do Brasil, junto com o MC mais escutado no ano!', horario: '22:00', quantidade: 5000 },
    { id: 2, nome: 'Gustavo Mioto', data: '2024-09-14', local: 'Rancho Quarto de Milha', preco: 120, descricao: 'FRONTSTAGE - Curta um dos artistas favoritos da população jovem.', horario: '22:00', quantidade: 3000 },
    { id: 3, nome: 'Jads e Jadson', data: '2024-09-', local: 'Rancho Quarto de Milha', preco: 120, descricao: 'FRONTSTAGE - Uma das duplas mais renomadas da música brasileira, vem carregando à tempos este troféu! Com vocês, Jads e Jadson.', horario: '21:00', quantidade: 2000 }
];

// Pág. inicial
app.get('/', (req, res) => {
    res.render('index', { eventos });
});

// Pág. de detalhes do evento
app.get('/evento/:id', (req, res) => {
    const evento = eventos.find(e => e.id == req.params.id);
    if (evento) {
        res.render('detalhes', { evento });
    } else {
        res.status(404).send('Evento não encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
