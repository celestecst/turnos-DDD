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

  //Mapea desde la bd , se saltea las validaciones y asume que si el dato ya estaba en la bd, es un dato válido.
  static reconstruir(
    id: string,
    clienteId: string,
    profesionalId: string,
    fechaHora: Date,
    estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
  ): Turno {
    return new Turno(id, clienteId, profesionalId, fechaHora, estado);
  }

  confirmar(): void {
    if (this.estado === 'CANCELADO') {
      throw new Error('No se puede confirmar un turno que ya fue cancelado');
    }
    this.estado = 'CONFIRMADO';
  }

  cancelar(): void {
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
