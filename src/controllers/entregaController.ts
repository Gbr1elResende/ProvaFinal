import { Request, Response } from 'express';
import * as service from '../services/entregaService.js';

export const postEntrega = async (req: Request, res: Response) => {
    try {
        const nova = await service.criarEntrega(req.body);
        res.status(201).json(nova);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getEntregas = async (req: Request, res: Response) => {
    const lista = await service.listarEntregas();
    res.status(200).json(lista);
};

export const getPorStatus = async (req: Request, res: Response) => {
    const { status } = req.params;
    const lista = await service.listarEntregasPorStatus(status);
    res.status(200).json(lista);
};

export const putAssociar = async (req: Request, res: Response) => {
    try {
        const { idEntrega, placaVeiculo } = req.body;
        // Chama a lógica complexa do service
        const resultado = await service.associarVeiculo(idEntrega, placaVeiculo);
        res.status(200).json(resultado);
    } catch (error: any) {
        // Retorna 400 se der erro de regra de negócio (ex: veiculo ocupado)
        res.status(400).json({ mensagem: error.message });
    }
};

// Implementando outros endpoints básicos
export const putEntrega = async (req: Request, res: Response) => {
    try {
        const atualizado = await service.editarEntrega(req.params.id, req.body);
        res.status(200).json(atualizado);
    } catch (e) { res.status(400).send(); }
};

export const deleteEntrega = async (req: Request, res: Response) => {
    await service.deletarEntrega(req.params.id);
    res.status(204).send();
};