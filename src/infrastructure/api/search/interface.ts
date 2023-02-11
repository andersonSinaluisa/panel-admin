import { clients_interface } from "../clients";
import { installations_interface } from "../installation";
import { invoice_interface } from "../invoice";
import { jobs_interface } from "../jobs";
import { personal_interface } from "../personal";
import { products_interface } from "../products";
import { tasks_interface } from "../tasks";
import { user_interface } from "../users";

interface SearchResponse {
    data: {
        invoices:{
            data:invoice_interface.Invoice[];
        },
        clients:{
            data:clients_interface.Client[];
        },
        installations:{
            data:installations_interface.Installation[];
        },
        jobs:{
            data:jobs_interface.Job[];
        },
        staff:{
            data:personal_interface.Personal[];
        },
        products:{
            data: products_interface.Product[];
        },
        tasks:{
            data:tasks_interface.Task[];
        },
        users:{
            data:user_interface.User[];
        }
    };
    message: {
        summary: string;
        detail: string;
        status: number;
    }

}

export type {
    SearchResponse
}