export function formatPrice(price: number): string {
  return '￥' + price.toLocaleString();
}
