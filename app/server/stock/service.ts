import type { IStock } from './interfaces';
import * as repo from './repository';

export async function getStock() {
  return repo.getStock();
}

export async function createStock(
  roomId: string,
  { price, name, description }: Pick<IStock, 'price' | 'name' | 'description'>,
) {
  const stock: IStock = {
    price,
    name,
    description,
    rate: 0,
    logs: [{ price, date: new Date() }],
  };
  const product = await repo.createStock(stock);
  // await roomService.addStock(roomId, product._id.toString());
  return product;
}

export async function updateStock(id: string, newPrice: number) {
  try {
    await repo.updateStock(id, newPrice);
    return { success: true, message: 'price update successfully' };
  } catch (error) {
    return { success: false, message: 'price update error' };
  }
}

export async function deleteStock(id: string) {
  repo.deleteStock(id);
}
