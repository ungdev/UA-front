export interface Settings {
  login: boolean;
  shop: boolean;
}

export interface Partner {
  name: string;
  description: string;
  image: string;
  link: string;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
