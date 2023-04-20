import { FormGroup } from '@angular/forms';


export const markInvalidControls = (form:FormGroup) => {
  const controls = form.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      controls[name].markAllAsTouched();
    }
  }
};
