import axios from "axios";
import { QrCodePix } from "qrcode-pix";

type ApiProductProps = {
  id: number;
  name: string;
  price: number;
}

export type ProductProps = ApiProductProps & {
  image: string;
}

async function getProducts() {

  const { data } = await axios.get<ApiProductProps[]>('/mock/products.json');

  return data.map<ProductProps>(i => ({
    ...i,
    image: `/images/products/${i.id}.webp`
  }));

}

function getProductQRCode(product: ProductProps, name: string) {

  const qrCodePix = QrCodePix({
    version: '01',
    key: '05168276938',
    city: 'guaratuba',
    name: 'Suellen Sousa Dias',
    value: product.price,
    message: `${product.name} - Feito por ${name}`,
  });

  return qrCodePix.payload();
}

export const productService = {
  getProducts,
  getProductQRCode
}