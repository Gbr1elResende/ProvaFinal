import { Entrega, Veiculo } from '../models/types.js';
import { lerArquivo, escreverArquivo } from './fileService.js';
import { v4 as uuidv4 } from 'uuid'; // Instale: npm install uuid @types/uuid

const ARQUIVO_ENTREGAS = 'entregas.json';
const ARQUIVO_VEICULOS = 'veiculos.json';

export const criarEntrega = async (dados: Omit<Entrega, 'id'>) => {
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
    const novaEntrega: Entrega = { id: uuidv4(), ...dados };
    entregas.push(novaEntrega);
    await escreverArquivo(ARQUIVO_ENTREGAS, entregas);
    return novaEntrega;
};

export const listarEntregas = async () => {
    return await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
};

// REQUISITO: Filtrar por status 
export const listarEntregasPorStatus = async (status: string) => {
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
    // Filtra apenas as entregas que batem com o status recebido
    return entregas.filter(e => e.status === status); 
};

// DESAFIO DE LÓGICA: Associar Veículo [cite: 10]
export const associarVeiculo = async (idEntrega: string, placaVeiculo: string) => {
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
    const veiculos = await lerArquivo<Veiculo>(ARQUIVO_VEICULOS);

    const entrega = entregas.find(e => e.id === idEntrega);
    const veiculo = veiculos.find(v => v.placa === placaVeiculo);

    if (!entrega) throw new Error('Entrega não encontrada');
    if (!veiculo) throw new Error('Veículo não encontrado');

    // Verifica se o veículo está disponível [cite: 11]
    if (veiculo.status !== 'Disponível') {
        throw new Error('Veículo indisponível');
    }

    // Associa o veículo à entrega
    entrega.idVeiculo = placaVeiculo;
    entrega.status = 'Em Rota'; // [cite: 13]

    // Muda o status do veículo
    veiculo.status = 'Em Rota'; // [cite: 13]

    // Salva os DOIS arquivos atualizados
    await escreverArquivo(ARQUIVO_ENTREGAS, entregas);
    await escreverArquivo(ARQUIVO_VEICULOS, veiculos);

    return entrega;
};

export const editarEntrega = async (id: string, dadosAtualizados: Partial<Entrega>) => {
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
    const index = entregas.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Entrega não encontrada');

    entregas[index] = { ...entregas[index], ...dadosAtualizados };
    await escreverArquivo(ARQUIVO_ENTREGAS, entregas);
    return entregas[index];
};

export const deletarEntrega = async (id: string) => {
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);
    const novaLista = entregas.filter(e => e.id !== id);
    await escreverArquivo(ARQUIVO_ENTREGAS, novaLista);
};