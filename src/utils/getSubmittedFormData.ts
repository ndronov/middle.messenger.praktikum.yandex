interface FormDataType {
  entries: () => IterableIterator<[string, FormDataEntryValue]>;
}

const getSubmittedFormData = (e: Event): Record<string, FormDataEntryValue> => {
  const formData = new FormData(e.target as HTMLFormElement) as FormDataType;
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
