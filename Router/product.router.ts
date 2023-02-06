import { Router } from "express";
import { Postproduct, GettingProducts} from "../Controller/Product.contoller";

const productRouter = Router()
productRouter.route("/CreatingProducts").post(Postproduct);
productRouter.route("/").get(GettingProducts)

export default productRouter;
