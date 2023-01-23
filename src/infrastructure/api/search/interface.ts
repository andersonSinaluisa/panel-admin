import { clients_interface } from "../clients";
import { installations_interface } from "../installation";
import { jobs_interface } from "../jobs";
import { personal_interface } from "../personal";
import { products_interface } from "../products";
import { tasks_interface } from "../tasks";
import { user_interface } from "../users";

interface SearchResponse{
    status:number;
    message:{
        clients: clients_interface.Client[];
        installations: installations_interface.Installation[];
        jobs: jobs_interface.Job[];
        personal: personal_interface.Personal[];
        products: products_interface.Product[];
        tasks: tasks_interface.Task[];
        users: user_interface.User[];
        
    }
}

export type {
    SearchResponse
}