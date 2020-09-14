import { ContextStrategy as Context } from './base';
import { MongoDBStrategy as MongoDB } from './mongodb';

const main = {
  Context,
  MongoDB
};

export { main, Context, MongoDB };
export default main;
