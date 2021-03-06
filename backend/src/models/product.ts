import mongoose from 'mongoose';
import { DiscountDoc } from './discount';

interface ProductBySize {
  size: string;
  amount: number;
}

export interface ProductAttrs {
  name: string;
  brand: string;
  productType: string;
  price: number;
  discountIds: DiscountDoc[];
  productBySize: ProductBySize[];
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  brand: string;
  productType: string;
  price: number;
  discountIds: DiscountDoc[];
  productBySize: ProductBySize[];
  createdAt: Date;
}

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  productType: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discountIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'discounts',
    },
  ],
  productBySize: [
    {
      size: {
        type: String,
        require: true,
      },
      amount: {
        type: Number,
        require: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

export const Product = mongoose.model<ProductDoc, ProductModel>(
  'products',
  productSchema
);
