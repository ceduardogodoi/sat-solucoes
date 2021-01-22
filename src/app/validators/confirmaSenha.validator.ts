import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmaSenhaValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const senha = control.get('senha');
  const confirmarSenha = control.get('confirmarSenha');

  if (confirmarSenha.pristine) {
    return null;
  }

  const doesNotMatch: boolean =
    senha && confirmarSenha && senha.value !== confirmarSenha.value;

  if (doesNotMatch) {
    confirmarSenha.setErrors({ confirmPasswordMismatch: true });

    return { confirmPasswordMismatch: true };
  }

  confirmarSenha.setErrors(null);

  return null;
};
