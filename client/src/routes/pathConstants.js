const PathConstants = {
  // Public pages
  LANDING: "/",
  INFO_POLICY: "/info-policy",
  LOGIN: "/login",
  SIGN_IN: "/sign-in",
  // Pages requiring login
  CATEGORY: "/category",
  VOCABULARY: "/category/:category",
  DISPLAY_VOCAB: "/category/:category/:vocabulary",

  SETUP_FORM: "/setup-form",
  CONTROL_BUTTONS: "/control-buttons",
  THREE_SCENE: "/three-scene",

  // admin
  CATEGORY_ADMIN: "/categoryad",
  VOCABULARY_ADMIN: "/categoryad/:categoryad",
  DISPLAY_VOCAB_ADMIN: "/categoryad/:categoryad/:vocabularyad",
  RECORD: "/record/:categoryad/:vocabularyad",
  DONE: "/donerecord",
  // API
}

export default PathConstants
