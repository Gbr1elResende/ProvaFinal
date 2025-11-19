import express from 'express';
import routes from './routes/index.js'; // .js é necessário em imports ESM

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes); // [cite: 23]

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});