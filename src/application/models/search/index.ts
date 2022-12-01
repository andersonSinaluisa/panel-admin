import { createModel } from "@rematch/core";
import { HeaderProps, ResponseServer } from "infrastructure/api/api-handler";
import { search_request } from "infrastructure/api/search";
import { SearchResponse } from "infrastructure/api/search/interface";
import { RootModel } from "..";


export interface SearchStateProps extends ResponseServer{
    data:SearchResponse
}

export const SEARCH = createModel<RootModel>()({
    state: {
        search:{
            data:{
                message:[],
                status:0,
            },
            error:"",
            status:0
        } as SearchStateProps
    },
    reducers: {
        onSearch: (state, payload:SearchStateProps) => {
            return {
                ...state,
                search:payload
            }
        }
    },
    effects: (dispatch) => ({
        async onSearchAsync(props:{
            headers:HeaderProps,
            identityCounter:string,
            type:string,
        }){
            try{
                const res = await search_request.Search(props).toPromise()
                dispatch.SEARCH.onSearch({
                    data:res.data,
                    error:"",
                    status:res.status
                })
                
            }catch(e:any){
                dispatch.SEARCH.onSearch({
                    data:{
                        message:[],
                        status:0
                    },
                    error:e.message,
                    status:e.status
                })
            }
        }
    })
})