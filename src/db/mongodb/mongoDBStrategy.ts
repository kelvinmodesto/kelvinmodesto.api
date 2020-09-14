import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Context } from '@db/index';

export default class MongoDBStrategy extends Context {
  public connection: any;
  public model: any;

  constructor(connection: any, model: any) {
    super(connection);
    this.model = model;
    this.connection = connection;
  }

  public static buildConnectionString() {
    dotenv.config();
    return `${process.env.DB_MONGO}://${process.env.DB_USER_MONGO}:\
${process.env.DB_PASS_MONGO}@${process.env.DB_HOST_MONGO}:\
${process.env.DB_PORT_MONGO}/${process.env.DB_NAME_MONGO}`;
  }

  public static async connect() {
    await mongoose.connect(this.buildConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection;
  }

  public async create(item: any = {}) {
    return this.model.create(item);
  }

  public async read(item: any = {}) {
    return this.model.find(item);
  }

  public async update(id: string, item: any = {}) {
    return this.model.updateOne({ _id: id }, { $set: item });
  }

  public async delete(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  public async isConnected() {
    const state: number = this.connection.readyState;
    if (state === 1) return state;
    if (state !== 2) return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.connection.readyState;
  }
}
