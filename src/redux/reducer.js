import {
  SET_APP_STATE,
  SET_PROFILE_STATE,
  SET_AUTH_STATE,
  SET_ROOT_STATE,
  SET_INVOICE_STATE,
  SET_CLIENT_STATE,
  SET_ITEMS_STATE,
} from "./types";

const INITIAL_STATE = {
  authState: {},
  profileState: {
    logo: "",
    fullname: "",
  },
  appState: {
    selectedClient: null,
    currentItems: [],
    clientList: [],
    template: 1,
  },
  clients: { data: [] },
  items: { data: [] },
  rootState: {},
  invoices: { data: [] },
};

const AppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE_STATE:
      return {
        ...state,
        profileState: { ...state.profileState, ...action.payload },
      };
    case SET_INVOICE_STATE:
      return {
        ...state,
        invoices: { ...state.invoices, ...action.payload },
      };
    case SET_APP_STATE:
      return {
        ...state,
        appState: { ...state.appState, ...action.payload },
      };
    case SET_CLIENT_STATE:
      return {
        ...state,
        clients: { ...state.clients, ...action.payload },
      };
    case SET_ITEMS_STATE:
      return {
        ...state,
        items: { ...state.items, ...action.payload },
      };
    case SET_AUTH_STATE:
      return {
        ...state,
        authState: { ...state.authState, ...action.payload },
      };
    case SET_ROOT_STATE:
      return {
        ...state,
        rootState: { ...state.rootState, ...action.payload },
      };
    default:
      return state;
  }
};

export default AppReducer;
