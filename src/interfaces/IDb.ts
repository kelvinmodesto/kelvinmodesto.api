export interface IDb {
  create(item: unknown): unknown;
  read(item: unknown): unknown;
  update(id: string, item: unknown): unknown;
  delete(id: string): unknown;
  isConnected(): unknown;
}
