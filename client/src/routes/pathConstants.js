const PathConstants = {
  // Public pages
  LANDING: '/',
  INFO_POLICY: '/info-policy',
  LOGIN: '/login',
  SIGN_IN: '/sign-in',
  // Pages requiring login
  CATEGORY: '/category',
  CATEGORY_ADMIN: '/categoryad',
  VOCABULARY: '/category/:categoryName',
  VOCABULARY_ADMIN: '/categoryad/:categoryName',
  DISPLAY_VOCAB: '/category/:categoryName/:vocabName',
  DISPLAY_VOCAB_ADMIN: '/category/:categoryName/:vocabNamead',

  SETUP_FORM: '/setup-form',
  CONTROL_BUTTONS: '/control-buttons',
  THREE_SCENE: '/three-scene',
  RECORD1: '/record1',
  // RECORD2: '/record2',
  DONE:'/donerecord'
};

export default PathConstants;
