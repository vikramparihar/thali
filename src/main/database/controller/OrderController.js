const connection = require('../dbConnection');
const OrderSchema = connection.getModels().OrderSchema;

class OrderController {
  constructor() {}

  async getOrders(args = null) {
    let id = args && typeof args.id != 'undefined' ? args.id : null;
    let rs;
    try {
      if (id) {
        rs = await OrderSchema.findByPk(id,{
          raw: true,
        });
      } else {
        rs = await OrderSchema.findAll({
          raw: true,
        });
      }
      return {
        status: 'ok',
        result: rs,
      };
    } catch (error) {
      console.log('Error in OrderController::getPrders', error);
      return {
        error: 'Sorry something went wrong',
      };
    }
  }

  async saveOrder(args) {
    try {
      const { items } = args;
      console.log(items);
      console.log(connection.getModels());
      let order = await OrderSchema.create({
        items: JSON.stringify(items),
      });
      return { status: 'ok', order: order };
    } catch (error) {
      console.log(error);
      return { status: 'failed', error: error };
    }
  }

  async updateOrder(args) {
    try {
      const { items, id } = args;
      console.log(id);
      console.log(items);
      let order = await OrderSchema.upsert({
        id: id,
        items: JSON.stringify(items),
      });
      return { status: 'ok', order: order };
    } catch (error) {
      console.log(error);
      return { status: 'failed', error: error };
    }
  }
}

module.exports = new OrderController();
