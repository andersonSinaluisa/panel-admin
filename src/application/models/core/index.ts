import { createModel } from "@rematch/core";
import { initialMetaResponse } from "infrastructure/api/api-handler";
import { GetCataloguesResponse } from "infrastructure/api/core/interface";
import { RootModel } from "..";
import * as APIHANDLER from 'infrastructure/api/api-handler';
import { request_core } from "infrastructure/api/core";
export interface CatalogueState extends APIHANDLER.ResponseServer {
    data: GetCataloguesResponse;
}

export const CORE = createModel<RootModel>()({
    state: {
        catalogues: {
            data: {
                ...initialMetaResponse,
                data: []
            },
            status: 0,
            error: ""
        } as CatalogueState

    },
    effects: (dispatch) => ({
        async getCataloguesAsync(payload: APIHANDLER.HeaderProps) {
            try {
                const response = await request_core.GetCatalogueType(payload).toPromise();
                dispatch.CORE.onGetCatalogues({
                    data: response.data,
                    status: response.status,
                    error: ""
                });
            } catch (e: any) {
                let error = e.response ? e.response.data?.message?.summary : "Ocurrió un error"
                error += e.response ? e.response.data?.message?.detail : ""
                dispatch.CORE.onGetCatalogues({
                    data: {
                        ...initialMetaResponse,
                        data: []
                    },
                    status: e.response ? e.response.status : 400,
                    error: error
                });
            }
        }
    }),
    reducers: {
        onGetCatalogues(state, payload: CatalogueState) {
            return {
                ...state,
                catalogues: payload
            }
        }
    }
})