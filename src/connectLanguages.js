import { withNamespaces } from 'react-i18next';

export function connectLanguages(component) {
    return withNamespaces('translation')(component)
};
