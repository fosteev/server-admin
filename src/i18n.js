import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

const localStorageIndex = 'language-last-index';


const setInLocalStorageLanguages = () => {
    fetch('http://localhost:3000/languages').then(response =>  response.json().then(data => {
        let languages = [];
        for (const key in data[0]) {
            if ((key !== 'keyword') && (key !== 'id')) {
                languages.push(key);
            }
        }
        const options = {};
        languages.forEach(language => {
            options[language] = {
                translation: {}
            };
            const translation = options[language].translation;
            data.forEach(item => {
                translation[item.keyword] = item[language]
            })
        });

        localStorage.setItem('languages', JSON.stringify(options));
        window.location.reload();
    }))
}

const getLastIndex = () => {
    fetch('http://localhost:3000/languages/lastIndex').then(response => response.json().then(data => {
        if (localStorage.getItem(localStorageIndex) != data.id) {
            localStorage.setItem(localStorageIndex, data.id);
            setInLocalStorageLanguages();
        }
    }))
}



const languages = JSON.parse(localStorage.getItem('languages'));

getLastIndex();

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources: languages,
        lng: "usa",
        fallbackLng: "usa",

        interpolation: {
            escapeValue: false
        }
    });