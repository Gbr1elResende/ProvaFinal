import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para pegar o caminho correto no modo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta data
const dataPath = path.join(__dirname, '../../data');

export const lerArquivo = async <T>(nomeArquivo: string): Promise<T[]> => {
    try {
        const caminho = path.join(dataPath, nomeArquivo);
        const dados = await fs.readFile(caminho, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
        // Se o arquivo não existir, retorna array vazio
        return [];
    }
};

export const escreverArquivo = async (nomeArquivo: string, dados: any): Promise<void> => {
    const caminho = path.join(dataPath, nomeArquivo);
    // null, 2 serve para deixar o JSON bonito (identado)
    await fs.writeFile(caminho, JSON.stringify(dados, null, 2));
};