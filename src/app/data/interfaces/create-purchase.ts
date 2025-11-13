import { ticket } from "./ticket";

export interface Purchase{
    customer: number,
    purchaseDate: Date,
    tickets: ticket[],
    status:string
}