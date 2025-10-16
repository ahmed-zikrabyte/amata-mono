import { Router } from "express";
import UserAddressController from "../../controllers/client/address.user.controller";

const userAddressRoute: Router = Router();
const userAddressController = new UserAddressController();

userAddressRoute.get("/", userAddressController.getAddresses);
userAddressRoute.post("/add", userAddressController.addAddress);
userAddressRoute.put("/edit/:addressId", userAddressController.updateAddress);
userAddressRoute.delete(
  "/delete/:addressId",
  userAddressController.deleteAddress
);

export default userAddressRoute;
