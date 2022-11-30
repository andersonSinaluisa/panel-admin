import UserView from '../container/users/view-container';
import DetailUser from '../container/users/detail-container';
import CreateUser from '../container/users/create-container'
import ClientsView from '../container/clients/view-container';
import CreateClient from '../container/clients/create-container';
import UpdateClient from '../container/clients/update-container';
import ViewInstallations from '../container/installations/view-container';
import CreateInstallation from '../container/installations/create-container';
import PersonalView from '../container/personal/view-container';
import CreatePersonal from '../container/personal/create-container';
import TaskView from '../container/tasks/view-container';
import ViewJobs from '../container/jobs/view-container';
import ProductView from '../container/products/view-container';
import CreateProduct from '../container/products/create-container';
import DashboardView from '../container/dashboard/view-container';
import EditProduct from  '../container/products/edit-container';
import ViewInvoices from '../container/invoice/view-container';
import CreateInvoice from '../container/invoice/create-container'
import DetailInvoice from '../container/invoice/detail-container';
import EditInstallation from '../container/installations/edit-container';
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
        name:"Dashboard",
        relative_path:"",
        path:"",
        element:<DashboardView title="Estadisticas" breadcrumbs={["Estadisticas"]}/>,
        permissions:[],
        visible_in_menu:true,
        icon:"bx bx-home",
        order:1
    },
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
    //DetailUser
    {
        name:'Detalle de Usuario',
        relative_path:'usuarios/:id',
        path:'/inicio/usuarios/:id',
        element:<DetailUser title="Detalle de Usuario" breadcrumbs={['Detalle de Usuario']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
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
    //EditInstallation
    {
        name:'Ver Instalacion',
        relative_path:'instalaciones/:id',
        path:'/inicio/instalaciones/:id',
        element:<EditInstallation title="Instalaciones" breadcrumbs={['Ver Instalacion']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
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
        
    },
    {
        name:'Nuevo Personal',
        relative_path:'personal/nuevo',
        path:'/inicio/personal/nuevo',
        element:<CreatePersonal title="Personal" breadcrumbs={['Nuevo Personal']} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bxs-user',
        order:1,
    },
    
    {
        name:'Trabajos',
        relative_path:'trabajos',
        path:'/inicio/trabajos',
        element:<ViewJobs title="Trabajos" breadcrumbs={["Listado de Trabajos"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bx-task',
        order:1,

    },
    {
        name:'Tareas',
        relative_path:'tareas',
        path:'/inicio/tareas',
        element:<TaskView title="Tareas" breadcrumbs={["Listado de Tareas"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bx-task',
        order:1,
    },
    {
        name:'Almacen',
        relative_path:'productos',
        path:'/inicio/productos',
        element:<ProductView title="Productos" breadcrumbs={["Listado de Productos"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bxl-product-hunt',
        order:1,
    },
    {
        name:'Nuevo Producto',
        relative_path:'productos/nuevo',
        path:'/inicio/productos/nuevo',
        element:<CreateProduct title="Productos" breadcrumbs={["Nuevo Producto"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'

        ],
        visible_in_menu:false,
        icon:'bx bxl-product-hunt',
        order:1,
    },
    {
        name:'Editar Producto',
        relative_path:'productos/:id',
        path:'/inicio/productos/:id',
        element:<EditProduct title="Productos" breadcrumbs={["Editar Producto"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bxl-product-hunt',
        order:1,
    },
    {
        name:'Facturación',
        relative_path:'facturas',
        path:'/inicio/facturas',
        element:<ViewInvoices title="Facturas" breadcrumbs={["Listado de Facturas"]}/>,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:true,
        icon:'bx bx-file',
        order:1,
    },
    {
        name:'Nueva Factura',
        relative_path:'facturas/nueva',
        path:'/inicio/facturas/nueva',
        element:<CreateInvoice title={"Facturas"} breadcrumbs={["Nueva Factura"]} />,
        permissions:[
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu:false,
        icon:'bx bx-file',
        order:1,
    },
    {
        name: 'Detalle Factura',
        relative_path: 'facturas/:id',
        path: '/inicio/facturas/:id',
        element: <DetailInvoice title={"Facturas"} breadcrumbs={["Detalle Factura"]} />,
        permissions: [
            'view_analysis',
            'view_analysislist'
        ],
        visible_in_menu: false,
        icon: 'bx bx-file',
        order: 1,

    }
    
   
]

export default routes;