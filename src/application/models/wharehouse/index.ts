import { ResponseServer } from "infrastructure/api/api-handler";
import { GetWharehouse } from "infrastructure/api/wharehouse/interface";


export interface GetWharehouseStateProps extends ResponseServer{
    data:GetWharehouse
}
