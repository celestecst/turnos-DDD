//Interface (contrato) que le dice a la app qué operaciones existen para guardar datos,
//pero sin importarle si usamos MySQL, un archivo txt, etc. Cumple con el principio Inversión de Dependencias.
import { Turno } from './turno.entity';

export interface TurnoRepository {
  guardar(turno: Turno): Promise<void>;
  buscarPorId(id: string): Promise<Turno | null>;
  buscarTodos(): Promise<Turno[]>;
}

// Este símbolo (Symbol) lo usaremos en NestJS para inyectar este contrato más adelante.
export const TURNO_REPOSITORY = Symbol('TURNO_REPOSITORY');
