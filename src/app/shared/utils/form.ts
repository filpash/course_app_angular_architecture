export const markFormGropeTouched = (formGroup) => {
  (Object as any).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      markFormGropeTouched(control);
    }
  })
}
