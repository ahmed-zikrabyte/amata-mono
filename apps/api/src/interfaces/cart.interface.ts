import mongoose from "mongoose"

export interface ICart {
  userId: mongoose.Types.ObjectId,
  items: {
    product: mongoose.Types.ObjectId,
    quantity: number,
    variant: mongoose.Types.ObjectId,
  }[]
}