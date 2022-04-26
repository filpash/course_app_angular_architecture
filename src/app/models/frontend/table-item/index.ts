export interface ConfigData {
  isDate?: boolean;
  format?: string;
  isButton?: boolean;
  buttonName?: string[];
  isLink?: boolean;
  linkName?: string[];
}

export interface TableHeader {
  key: string;
  display: string;
  config?: ConfigData
}

export class TableDataHeader implements TableHeader {
  constructor(
    public key: string,
    public display: string,
    public config?: ConfigData
  ) {}
}
