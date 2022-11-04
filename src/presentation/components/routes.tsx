import UserView from '../container/users/view-container';
import CreateUser from '../container/users/create-container'
import ClientsView from '../container/clients/view-container';
import CreateClient from '../container/clients/create-container';
import UpdateClient from '../container/clients/update-container';
import ViewInstallations from '../container/installations/view-container';
import CreateInstallation from '../container/installations/create-container';
import PersonalView from '../container/personal/view-container';

interface RoutesProps{
    name:string;
    relative_path:string;
    path:string;
    element:JSX.Element;
    permissions:string[],
    visible_in_menu:boolean;
    icon:string;
    order:number;
}


const routes:RoutesProps[] =[
    {
        name:'Usuarios',
        relative_path:'usuarios',
        path:'/inicio/usuarios/',
        element:<UserView title="Usuarios" breadcrumbs={['Lista de Usuarios']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bx-user',
        order:1,
        
    },
    {
        name:'Nuevo Usuario',
        relative_path:'usuarios/nuevo',
        path:'/inicio/usuarios/nuevo',
        element:<CreateUser title="Usuarios" breadcrumbs={['Nuevo Usuario']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bx-people',
        order:1,
        
    },
    {
        name:'Clientes',
        relative_path:'clientes',
        path:'/inicio/clientes/',
        element:<ClientsView title="Clientes" breadcrumbs={['Nuevo Cliente']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bx-group',
        order:1,
        
    },
    {
        name:'Clientes',
        relative_path:'clientes/nuevo',
        path:'/inicio/clientes/nuevo',
        element:<CreateClient title="Clientes" breadcrumbs={['Nuevo Cliente']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bx-group',
        order:1,
        
    },
    {
        name:'Editar Clientes',
        relative_path:'clientes/:id',
        path:'/inicio/clientes/:id',
        element:<UpdateClient title="Clientes" 
        breadcrumbs={['Editar Cliente']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bx-group',
        order:1,
        
    },
    {
        name:'Instalaciones',
        relative_path:'instalaciones',
        path:'/inicio/instalaciones/',
        element:<ViewInstallations title="Instalaciones" breadcrumbs={['Instalaciones']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bxs-briefcase-alt-2',
        order:1,
        
    },
    {
        name:'Instalaciones',
        relative_path:'instalaciones/nuevo',
        path:'/inicio/instalaciones/nuevo',
        element:<CreateInstallation title="Instalaciones" breadcrumbs={['Nueva Instalacion']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bxs-briefcase-alt-2',
        order:1,
        
    },
    {
        name:'Personal',
        relative_path:'personal',
        path:'/inicio/personal',
        element:<PersonalView title="Personal" breadcrumbs={['Personal']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bxs-user',
        order:1,
        
    }
   
]

export default routes;