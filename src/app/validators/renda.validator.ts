import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rendaValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    return Number(control.value) < 1 ? { minRenda: true } : null;
  };
}
