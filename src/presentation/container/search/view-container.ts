import { connect } from 'react-redux'
import { HeaderProps } from 'infrastructure/api/api-handler';
import { SearchResponse } from 'infrastructure/api/search/interface';
import SearchView from 'presentation/components/search/view';

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
}


const mapSatateToProps = ({AUTH,SEARCH,NOTIFICATIONS}:any,ownProps:any)=>(
    {
        token: AUTH.Session.data.message.token,
        title: ownProps.title,
        breadcrumbs: ownProps.breadcrumbs,
        search:SEARCH.search.data,
    }
)


const mapDispatchToProps = ({ AUTH , SEARCH,NOTIFICATIONS}: any) => ({
    onSearchAsync:(props:{
        headers:HeaderProps,
        identityCounter:string
    })=>SEARCH.onSearchAsync(props),
})

export default connect(mapSatateToProps, mapDispatchToProps)(SearchView)