interface FormDataType {
  entries: () => IterableIterator<[string, FormDataEntryValue]>;
}

const getSubmittedFormData = (e: Event): Record<string, FormDataEntryValue> => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form) as FormDataType;
  const nonEmptyFields: Record<string, FormDataEntryValue> = {};

  Array.from(formData.entries()).forEach(([fieldName, fieldValue]) => {
    const isEmpty = fieldValue instanceof File ? !fieldValue.size : !fieldValue;

    if (!isEmpty) {
      nonEmptyFields[fieldName] = fieldValue;
    }
  });

  return nonEmptyFields;
};

export default getSubmittedFormData;
