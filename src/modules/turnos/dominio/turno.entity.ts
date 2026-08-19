//Se define qué es un turno y sus reglas de neogico. No se importa nada de TypeORM ni NestJS, es TS puro.
export class Turno {
  private constructor(
    private readonly id: string,
    private readonly clienteId: string,
    private readonly profesionalId: string,
    private fechaHora: Date,
    private estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
  ) {}

  // "Fábrica" para crear un turno nuevo
  static agendar(
    id: string,
    clienteId: string,
    profesionalId: string,
    fechaHora: Date,
  ): Turno {
    const ahora = new Date();
    if (fechaHora < ahora) {
      throw new Error('No puedes agendar un turno en el pasado.');
    }
    return new Turno(id, clienteId, profesionalId, fechaHora, 'PENDIENTE');
  }

  // Regla de negocio para cancelar
  cancelar(): void {
    if (this.estado === 'CANCELADO') {
      throw new Error('El turno ya está cancelado.');
    }
    this.estado = 'CANCELADO';
  }

  // Getters para poder leer los datos desde afuera
  getId() {
    return this.id;
  }
  getClienteId() {
    return this.clienteId;
  }
  getProfesionalId() {
    return this.profesionalId;
  }
  getFechaHora() {
    return this.fechaHora;
  }
  getEstado() {
    return this.estado;
  }
}
