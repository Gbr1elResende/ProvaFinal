import { Router } from 'express';
import * as entregaCtrl from '../controllers/entregaController.js';
import * as veiculoCtrl from '../controllers/veiculoController.js';

const router = Router();

// --- Rotas de Entregas [cite: 25] ---
router.post('/entregas', entregaCtrl.postEntrega);
router.get('/entregas', entregaCtrl.getEntregas);
router.get('/entregas/status/:status', entregaCtrl.getPorStatus); // [cite: 28]
router.put('/entregas/associar', entregaCtrl.putAssociar); // [cite: 31]
router.put('/entregas/:id', entregaCtrl.putEntrega);
router.delete('/entregas/:id', entregaCtrl.deleteEntrega);

// --- Rotas de Veículos [cite: 34] ---
router.post('/veiculos', veiculoCtrl.postVeiculo);
router.get('/veiculos', veiculoCtrl.getVeiculos);
router.delete('/veiculos/:placa', veiculoCtrl.deleteVeiculo); // [cite: 37]

export default router;