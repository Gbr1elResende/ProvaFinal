import { Request, Response } from 'express';
import * as service from '../services/veiculoService.js';

export const postVeiculo = async (req: Request, res: Response) => {
    await service.criarVeiculo(req.body);
    res.status(201).send();
};

export const getVeiculos = async (req: Request, res: Response) => {
    const lista = await service.listarVeiculos();
    res.status(200).json(lista);
};

export const deleteVeiculo = async (req: Request, res: Response) => {
    try {
        await service.deletarVeiculo(req.params.placa);
        res.status(204).send();
    } catch (error: any) {
        if (error.message.includes('INTEGRITY_ERROR')) {
            // Requisito: Retornar 400 se não puder deletar por estar em uso
            res.status(400).json({ erro: error.message });
        } else {
            res.status(500).send();
        }
    }
};