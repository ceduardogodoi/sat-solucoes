export class Pessoa {
  id: number;
  nome: string;
  dataCadastro: Date;
  cpf: string;
  renda: number;

  static formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
}
