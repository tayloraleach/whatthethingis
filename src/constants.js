export const MODELS = {
  GENERAL: 'GENERAL_MODEL',
  FOOD: 'FOOD_MODEL',
  TRAVEL: 'TRAVEL_MODEL',
  DEMOGRAPHICS: 'DEMOGRAPHICS_MODEL',
};

export const getModelNiceName = (modelName) => {
  switch (modelName) {
    case MODELS.GENERAL:
      return 'General';
    case MODELS.FOOD:
      return 'Food';
    case MODELS.TRAVEL:
      return 'Travel';
    case MODELS.DEMOGRAPHICS:
      return 'Demographics';
    default:
      return '';
  }
};

export const LANG_CODES = {
  SPANISH: {code: 'es', name: 'spanish'},
  ENGLISH: {code: 'en', name: 'english'},
};
