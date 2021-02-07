import {
  SET_APP_STATE,
  SET_AUTH_STATE,
  SET_PROFILE_STATE,
  SET_ROOT_STATE,
  SET_CLIENT_STATE,
  SET_INVOICE_STATE,
} from "./types";

import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import { ToastAndroid } from "react-native";

export const setClientState = (object) => {
  return (dispatch) => {
    database()
      .ref(`users/${auth().currentUser.uid}/clients/`)
      .on("value", (snapshot) => {
        const fetchedClients = [];
        snapshot.forEach((child) => {
          const client = child.val();
          fetchedClients.push({
            id: child.key,
            ...client,
          });
        });
        return dispatch({
          type: SET_CLIENT_STATE,
          payload: fetchedClients,
        });
      });
  };
};

export const setProfileState = (object) => {
  return (dispatch) => {
    database()
      .ref(`users/${auth().currentUser.uid}/userProfile/`)
      .once("value")
      .then((snapshot) => {
        return dispatch({
          type: SET_PROFILE_STATE,
          payload: { userData: snapshot.val() },
        });
      });
  };
};

export const setAppState = () => {
  return (dispatch) => {
    database()
      .ref(`users/${auth().currentUser.uid}/invoices/`)
      .on("value", (snapshot) => {
        const invoices = [];
        snapshot.forEach((child) => {
          const invoice = child.val();
          invoices.push({
            id: child.key,
            ...invoice,
          });
        });

        return dispatch({
          type: SET_INVOICE_STATE,
          payload: { data: invoices },
        });
      });
  };
};

export const setAuthState = (object) => {
  return {
    type: SET_AUTH_STATE,
    payload: object,
  };
};

export const setRootState = (object) => {
  return {
    type: SET_ROOT_STATE,
    payload: object,
  };
};

export const handleFbCatch = (code) => {
  // ToastAndroid.show(`FB error occured. ${code}`, ToastAndroid.LONG); // disable this line before export

  switch (code) {
    case "auth/invalid-verification-code":
      ToastAndroid.show("Verificaton code incorrect.", ToastAndroid.LONG);
      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError: "Verification code Incorrect. Please try again.",
          loading: false,
          fbError: "Verification code Incorrect. Please try again.",
        },
      };
    case "auth/missing-verification-code":
      ToastAndroid.show("Phone Verification failed.", ToastAndroid.LONG);
      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError: "Cannot verify code. Please try again later.",
          loading: false,
          fbError: "Cannot Verify code. Please try again later.",
        },
      };
    case "auth/web-storage-unsupported":
      ToastAndroid.show(
        "Web storage not Supported. Contact support",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError: 'Firebase error: Web storage not Supported',
          // fbError: 'Firebase error: Web storage not Supported',
        },
      };
    case "auth/user-token-expired":
      ToastAndroid.show(
        "User Token expired. Contact Support",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError:
          //   "Firebase error: Thrown if the user's credential has expired. This could also be thrown if a user has been deleted.",
          // fbError:
          //   "Firebase error: Thrown if the user's credential has expired. This could also be thrown if a user has been deleted.",
        },
      };
    case "auth/user-not-found":
      ToastAndroid.show("User does not exist", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "User does not exist. Please check and try again",
          fbError: "User does not exist. Please check and try again",
        },
      };

    case "auth/user-disabled":
      ToastAndroid.show(
        "User account disabled. Contact support.",
        ToastAndroid.LONG
      );
      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError:
          // 'Your account has been disabled. Please contact support.',
          // fbError: 'Your account has been disabled. Please contact support.',
        },
      };

    case "auth/unauthorized-domain":
      ToastAndroid.show(
        "Unauthorized Domain. Contact Support.",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError:
          //   'Thrown if the app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
          // fbError:
          //   'Thrown if the app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
        },
      };

    case "auth/too-many-requests":
      ToastAndroidAndroid.show(
        "Requests from your device blocked. Please try again later. ",
        ToastAndroid.LONG
      );
      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "Too many requests. We are disabling requests from this device for user protection. Please try again later.",
          fbError:
            "Too many requests. We are disabling requests from this device for user protection. Please try again later.",
        },
      };
    case "auth/operation-not-allowed":
      ToastAndroid.show(
        "Operation not allowed. Contact support",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError:
          //   'Firebase Error: Thrown if you have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.',
          // fbError:
          //   'Firebase Error: Thrown if you have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.',
        },
      };

    case "auth/network-request-failed":
      ToastAndroid.show(
        "No internet Connection. Please check your connection and try again.",
        ToastAndroid.LONG
      );
      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "No Internet Connection. Please check and try again.",
          fbError: "No Internet Connection. Please check and try again.",
        },
      };
    case "auth/invalid-tenant-id":
      ToastAndroid.show(
        "Invalid tenant id. Contact Support",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError: 'Thrown if the tenant ID provided is invalid.',
          // fbError: 'Thrown if the tenant ID provided is invalid.',
        },
      };
    case "auth/app-not-authorized":
      ToastAndroid.show(
        "Application version outdated. Please Update.",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "This version of your Cargo is no longer supported. Please Update or contact support for assistance.",
          fbError:
            "This version of your Cargo is no longer supported. Please Update or contact support for assistance.",
        },
      };

    case "auth/argument-error":
      ToastAndroid.show("Argument Error. Contact Support", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          // authenticationError:
          //   'Thrown if a method is called with incorrect arguments.',
          // fbError: 'Thrown if a method is called with incorrect arguments.',
        },
      };

    case "auth/invalid-api-key":
      ToastAndroid.show(
        "Application version outdated. Please Update.",
        ToastAndroid.LONG
      );

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "This version of your Cargo is no longer supported. Please Update or contact support for assistance.",
          fbError:
            "This version of your Cargo is no longer supported. Please Update or contact support for assistance.",
        },
      };
    case "auth/requires-recent-login":
      ToastAndroid.show(
        "Session expired due to inactivity.",
        ToastAndroid.LONG
      );

      const { currentUser } = firebase.auth();
      firebase.auth().signOut();

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "Session expired. Please login again to continue",
          fbError: "Session expired. Please login again to continue",
          phoneNumber: currentUser.phoneNumber,
        },
      };
    case "auth/email-already-in-use":
      ToastAndroid.show("Email already in use", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "Email already in use. Sign in or use another to continue",
          fbError: "Email already in use. Sign in or use another to continue",
        },
      };
    case "auth/invalid-email":
      ToastAndroid.show("Email invalid", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError:
            "That does not look like a valid Email address. Please check and try again",
          fbError:
            "That does not look like a valid Email address. Please check and try again",
        },
      };
    case "auth/quota-exceeded":
      ToastAndroid.show("Quota exceeded. Contact Support", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          authenticationError:
            "Too many requests. We are disabling requests from this device for user protection. Please try again later.",
          fbError:
            "Too many requests. We are disabling requests from this device for user protection. Please try again later.",
          errorField: "phone",
          loading: false,
        },
      };
    case "auth/credential-already-in-use":
      ToastAndroid.show("Phone/Email already in use.", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          authenticationError:
            "Phone number already in use. Sign in to continue or use another",
          fbError:
            "Phone number already in use. Sign in to continue or use another",
          errorField: "phone",
          loading: false,
        },
      };

    default:
      ToastAndroid.show("Unknow error. Contact Support", ToastAndroid.LONG);

      return {
        type: SET_AUTH_STATE,
        payload: {
          loading: false,
          authenticationError: `Unknown Error. Contact support.`,
          fbError: `Unknow error. Contact support.`,
        },
      };
  }
};
