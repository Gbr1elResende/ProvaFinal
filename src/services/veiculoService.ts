import { Veiculo, Entrega } from '../models/types.js';
import { lerArquivo, escreverArquivo } from './fileService.js';

const ARQUIVO_VEICULOS = 'veiculos.json';
const ARQUIVO_ENTREGAS = 'entregas.json';

export const criarVeiculo = async (veiculo: Veiculo) => {
    const veiculos = await lerArquivo<Veiculo>(ARQUIVO_VEICULOS);
    veiculos.push(veiculo);
    await escreverArquivo(ARQUIVO_VEICULOS, veiculos);
    return veiculo;
};

export const listarVeiculos = async () => {
    return await lerArquivo<Veiculo>(ARQUIVO_VEICULOS);
};

export const deletarVeiculo = async (placa: string) => {
    const veiculos = await lerArquivo<Veiculo>(ARQUIVO_VEICULOS);
    const entregas = await lerArquivo<Entrega>(ARQUIVO_ENTREGAS);

    const index = veiculos.findIndex(v => v.placa === placa);
    if (index === -1) throw new Error('Veículo não encontrado');

    // REQUISITO DE INTEGRIDADE[cite: 20]:
    // Só pode deletar se não estiver associado a entrega 'Em Rota' ou 'Pendente'
    const veiculoEmUso = entregas.some(e => 
        e.idVeiculo === placa && (e.status === 'Em Rota' || e.status === 'Pendente')
    );

    if (veiculoEmUso) {
        // Retornamos um erro específico para o controller pegar
        throw new Error('INTEGRITY_ERROR: Veículo possui entregas pendentes ou em rota.'); 
    }

    veiculos.splice(index, 1);
    await escreverArquivo(ARQUIVO_VEICULOS, veiculos);
};