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

export type Organisers = {
  title: string;
  members: {
    name: string;
    role: string;
  }[];
}[];

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
