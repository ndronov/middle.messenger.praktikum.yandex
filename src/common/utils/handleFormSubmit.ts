interface FormDataType {
  entries: () => IterableIterator<[string, FormDataEntryValue]>;
}

const handleSubmit = (e: Event) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement) as unknown as FormDataType;
  const nonEmptyFields: Record<string, FormDataEntryValue> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldValue) {
      nonEmptyFields[fieldName] = fieldValue;
    }
  }

  // eslint-disable-next-line no-console
  console.log('заполненные поля формы:', nonEmptyFields);
};

const handleFormSubmit = (): void => {
  const form: HTMLFormElement = document.forms[0];

  if (!form) {
    // eslint-disable-next-line no-console
    console.log('на странице нет доступных форм');

    return;
  }

  form.addEventListener('submit', handleSubmit);
};

export default handleFormSubmit;
