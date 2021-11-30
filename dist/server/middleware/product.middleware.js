"use strict";
// import type { NextFunction, Request, Response } from "express-serve-static-core";
// import { CartModel } from "../schemas/cart.schema.js";
// export function deleteProduct(req:Request, res:Response, next:NextFunction) {
//     // console.log("Delete product from cart");
//     CartModel.findOneAndUpdate(
//       { user: req.body.user._id},
//       {
//         $pull: { items: { product: req.params.id } },
//       },
//       {
//         new: true,
//       },
//       function (err, deleteFromCart) {
//         if (err) {
//           res.send("Error deleting product from cart");
//         } else {
//           res.json(deleteFromCart);
//           console.log("deleted prodct", deleteFromCart);
//         }
//       }
//     )
// }
//# sourceMappingURL=product.middleware.js.map