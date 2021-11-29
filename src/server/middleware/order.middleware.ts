import type { NextFunction, Request, Response } from "express-serve-static-core";
import { CartModel } from "../schemas/cart.schema.js";
import { OrderModel } from "../schemas/order.schema.js";



export function createOrder(req:Request, res:Response, next:NextFunction){

    const order = new OrderModel({
        user:req.body.user,
        items:req.body.items,
        count:req.body.count,
        total_amount:req.body.total_amount,
        });
      order
          .save()
          .then((data) => {
              next();
            console.log("Order created", data)
          })
          .catch((err) => {
            console.log(err);
            res.status(501);
            res.json({ errors: err });
          });


}
export function emptyCart(req:Request, res:Response, next:NextFunction) {
    CartModel.findOneAndUpdate(
        { user: req.body.user},
        {
          $set: { items: [] },
        },
        {
          new: true,
        },
        function (err, emptyCart) {
          if (err) {
            res.send("Error empty product from cart");
          } else {
            res.json(emptyCart);
            console.log("empty prodct", emptyCart);
          }
        }
      )
}