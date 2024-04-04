type DataTable = {
  english: string,
  spanish: string,
  reference: string,
  pronunciation: string,
};

type Data = {
  tab: string;
  table: DataTable[];
};

export type {
  DataTable,
  Data,
};
