import { connect } from 'react-redux'
import { HeaderProps } from 'infrastructure/api/api-handler';
import { SearchResponse } from 'infrastructure/api/search/interface';
import SearchView from 'presentation/components/search/view';
import { clients_interface } from 'infrastructure/api/clients';

export interface SearchViewProps{
    token:string;
    title:string;
    breadcrumbs:string[];
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string,
        type:string
    })=>void;
    search:SearchResponse;
    onGetClientsAsync:(props:HeaderProps)=>void;
    clients:clients_interface.GetClientsResponse;
}


const mapSatateToProps = ({AUTH,SEARCH,CLIENTS}:any,ownProps:any)=>(
    {
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        search:SEARCH.search.data,
        clients:CLIENTS.GetClients.data,
    }
)


const mapDispatchToProps = ({ AUTH , SEARCH,CLIENTS}: any) => ({
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string
    })=>SEARCH.onSearchAsync(props),
    onGetClientsAsync:(props:HeaderProps) => CLIENTS.onGetClientsAsync(props)
})

export default connect(mapSatateToProps, mapDispatchToProps)(SearchView)