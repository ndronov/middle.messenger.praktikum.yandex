import sanitizeUserInput from './sanitizeUserInput';

interface FormDataType {
  entries: () => IterableIterator<[string, FormDataEntryValue]>;
}

type DefaultFormDataType = Record<string, FormDataEntryValue>;

const getSubmittedFormData = <T = DefaultFormDataType>(e: Event): T => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form) as FormDataType;
  const nonEmptyFields: DefaultFormDataType = {};

  Array.from(formData.entries()).forEach(([fieldName, fieldValue]) => {
    const isEmpty = fieldValue instanceof File ? !fieldValue.size : !fieldValue;

    if (isEmpty) {
      return;
    }

    nonEmptyFields[fieldName] = typeof fieldValue === 'string'
      ? sanitizeUserInput(fieldValue)
      : fieldValue;
  });

  return nonEmptyFields as unknown as T;
};

export default getSubmittedFormData;
