import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

export function validateAfterDirty(
  control: AbstractControl,
  validators: ValidatorFn | ValidatorFn[]
): void {
  control.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
    if (control.dirty) {
      control.setValidators(validators);

      control.updateValueAndValidity();
    }
  });
}
