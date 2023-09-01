module.exports = {
  rootTranslationsPath: 'https://d2og5lryw1ajtt.cloudfront.net/language/',
  langs: ['ar', 'en'], // Include 'en' in the list of supported languages
  keysManager: {},
  config: {
    defaultLang: localStorage.getItem('locale') === 'ar' ? 'ar' : 'en',
    fallbackLang: localStorage.getItem('locale') === 'ar' ? 'en' : 'ar',
    reRenderOnLangChange: true,
    prodMode: environment.production,
  },
};