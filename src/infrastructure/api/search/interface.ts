import { clients_interface } from "../clients";
import { installations_interface } from "../installation";
import { jobs_interface } from "../jobs";
import { personal_interface } from "../personal";
import { products_interface } from "../products";
import { tasks_interface } from "../tasks";
import { user_interface } from "../users";

interface SearchResponse{
    status:number;
    message:clients_interface.Client[]|installations_interface.Installation[]
    |jobs_interface.Job[]|personal_interface.Personal[]|products_interface.Product[]|tasks_interface.Task[]|user_interface.User[]|null
}

export type {
    SearchResponse
}