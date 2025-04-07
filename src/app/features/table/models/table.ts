export interface Table {
  id: number;
  restaurantId: number;
  tableIdentifier: string;
  waitersId?: Array<number>;
}
