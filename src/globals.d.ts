declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __PRELOADED_STATE__: any;
  }

  interface RequestInit {
    transform?: any;
  }
}

export {};
