import { connect } from 'react-redux'
import { HeaderProps } from 'infrastructure/api/api-handler'
import {  GetPersonalByIdStateProps, UpdatePersonalStateProps } from "application/models/personal";
import DetailPersonal from "presentation/components/personal/detail";
import { UpdatePersonalRequest } from 'infrastructure/api/personal/interface';
import { CatalogueState } from 'application/models/core';

export interface   DetailPersonalProps{
    token: string;
    title: string;
    breadcrumbs: string[];
    GetPersonalById: GetPersonalByIdStateProps;
    onGetPersonalByIdAsync:(payload:{ headers: HeaderProps, id: number })=>void;
    onUpdatePersonalAsync:(payload:{
        headers: HeaderProps,
        id:number,
        body:UpdatePersonalRequest
    })=>void;
    UpdatePersonal:UpdatePersonalStateProps;
    isLoading:boolean;
    catalogues: CatalogueState;

}
//connect to redux
const mapStateToProps = ({PERSONAL,AUTH,loading,CORE}:any,ownProps:any) => {
    return {
        GetPersonalById:PERSONAL.GetPersonalById,
        token: AUTH.Session.data.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        isLoading: loading.effects.PERSONAL.onUpdatePersonalAsync,
        UpdatePersonal: PERSONAL.UpdatePersonal,
        catalogues: CORE.catalogues,

    };
}

const mapDispatchToProps = ({PERSONAL}: any) => {
    return {
        onGetPersonalByIdAsync:(payload:{ headers: HeaderProps, id: number })=>PERSONAL.onGetPersonalByIdAsync(payload),
        onUpdatePersonalAsync:(payload:{
            headers: HeaderProps,
            id:number,
            body:UpdatePersonalRequest
        })=>PERSONAL.onUpdatePersonalAsync(payload)
    
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPersonal);