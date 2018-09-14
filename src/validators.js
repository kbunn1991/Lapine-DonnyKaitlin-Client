export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'No spaces';
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Minimum ${length.min} letters`;
    }
    if (length.max && value.length > length.max) {
        return `Maximum ${length.max} letters`;
    }
};
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';
