export interface Settings {
  login: boolean;
  shop: boolean;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
