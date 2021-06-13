interface FormDataType {
  entries: () => IterableIterator<[string, FormDataEntryValue]>;
}

const handleFormSubmit = (e: Event): void => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement) as FormDataType;
  const nonEmptyFields: Record<string, FormDataEntryValue> = {};

  Array.from(formData.entries()).forEach(([fieldName, fieldValue]) => {
    if (fieldValue) {
      nonEmptyFields[fieldName] = fieldValue;
    }
  });

  // eslint-disable-next-line no-console
  console.log('заполненные поля формы:', nonEmptyFields);
};

export default handleFormSubmit;
