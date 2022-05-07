import mongoose from 'mongoose';
import { OrderDoc } from './order';

export interface AccountAttrs {
  email: string;
  name: string;
  address: string;
  phone: string;
  role: string;
  orderIds: OrderDoc[];
}

export interface AccountDoc extends mongoose.Document {
  email: string;
  name: string;
  address: string;
  phone: string;
  role: string;
  orderIds: OrderDoc[];
  createdAt: Date;
}

export interface AccountModel extends mongoose.Model<AccountDoc> {
  build(attrs: AccountAttrs): AccountDoc;
}

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    require: true,
  },
  orderIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orders',
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

accountSchema.statics.build = (attrs: AccountAttrs) => {
  return new Account(attrs);
};

export const Account = mongoose.model<AccountDoc, AccountModel>(
  'accounts',
  accountSchema
);
