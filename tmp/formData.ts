type FormValue = {
  name: string
  value: string | Blob
  fileName?: string
}

export type FormObject = {
  [key: string]: null | string | number | boolean
}

const convertToFormValues = (obj: FormObject): FormValue[] => Object.entries(obj).map(
  ([key, value]) => {
    const stringValue = value == null ? "" : String(value);
    return { name: key, value: stringValue };
  },
);

const createFormData = (data: FormValue[]): FormData => {
  const form = new FormData();
  data.forEach((d) => (
    d.fileName
      ? form.set(d.name, d.value, d.fileName)
      : form.set(d.name, d.value)
  ));
  return form;
};

export const generateFormData = (obj: FormObject): FormData => createFormData(
  convertToFormValues(obj),
);
