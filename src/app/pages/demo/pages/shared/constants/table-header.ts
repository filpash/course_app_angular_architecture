import {TableDataHeader, TableHeader} from '@app/models/frontend';

export const requestsColNameProps: TableHeader[] = [
  new TableDataHeader('id', 'ID'),
  new TableDataHeader('name', 'NAME'),
  new TableDataHeader('surname', 'SURNAME'),
  new TableDataHeader('age', 'AGE'),
  new TableDataHeader('department', 'DEPARTMENT', { isLink: true, linkName: ['Department id'] }),
];
