// Define o formato de um Veículo
export interface Veiculo {
    placa: string;
    modelo: string;
    status: 'Disponível' | 'Em Rota' | 'Manutenção'; // Restringe os textos possíveis
}

// Define o formato de uma Entrega
export interface Entrega {
    id: string;
    descricao: string;
    status: 'Pendente' | 'Em Rota' | 'Concluída';
    idVeiculo: string | null; // Pode ser null se ainda não tiver veículo
}