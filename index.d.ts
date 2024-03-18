declare module "@formfusion/tin" {
  type Tin = {
    AT: string;
    BE: string;
    BG: string;
    CY: string;
    CZ: string;
    DE: string;
    DK: string;
    EE: string;
    EL: string;
    ES: string;
    FI: string;
    FR: string;
    HR: string;
    HU: string;
    IE: string;
    IT: string;
    LT: string;
    LU: string;
    LV: string;
    MT: string;
    NL: string;
    PL: string;
    PT: string;
    RO: string;
    SE: string;
    SI: string;
    SK: string;
  };

  type LowercaseKeys<T> = {
    [K in keyof T as K extends string ? Lowercase<K> : never]: T[K];
  };

  type tin = LowercaseKeys<Tin>;

  export = tin;
}
