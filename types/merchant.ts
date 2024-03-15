export interface Theme {
  '--background': string;
  '--foreground': string;
  '--primary': string;
  '--primary-foreground': string;
}

export interface MerchantData {
  merchantName: string;
  merchantLogo: string;
  theme: Theme;
}
