import { ProductProps } from "../../services/productsService";

export type OrderProps = {
  label: string;
  value: string;
}

export const orderOptions = [
  {
    label: "A-Z",
    value: 'A-Z',
  },
  {
    label: "Z-A",
    value: 'Z-A',
  },
  {
    label: "PREÇO MIN",
    value: 'PRICE_MIN',
  },
  {
    label: "PREÇO MAX",
    value: 'PRICE_MAX',
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(price);
}

function sortProducts(products: ProductProps[], order: OrderProps) {

  switch (order.value) {
    case 'A-Z':
      return products.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    case 'Z-A':
      return products.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    case 'PRICE_MIN':
      return products.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      });
    case 'PRICE_MAX':
      return products.sort((a, b) => {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
      });
    default:
      return products;

  }
}

export const productHelper = {
  formatPrice,
  sortProducts
}