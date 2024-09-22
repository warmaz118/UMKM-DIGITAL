import { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { menu } from "./controller";
import { RouterInterface, withRouterInterface } from "../../router/interface";
import { Icon, Skeleton } from "../../components";
class Dashboard extends Component <RouterInterface>{

    state: Readonly<{
        listMenu: Array<any>;
    }>;
   
    constructor(props: RouterInterface) {
        super(props);
        this.state = {listMenu: []};
        this.fetchMenu = this.fetchMenu.bind(this);
    }

    componentDidMount() {
        this.fetchMenu();
    }
    
    fetchMenu() {
        menu().then((res) => this.setState({listMenu: res.data}));
    }


    render() {
        return (
        <div className="w-full flex h-screen overflow-y-hidden">
            {/* sidebar */}
            <div className="border-r border-gray-300 sm:w-2/12 overflow-y-auto pt-5">
                <div className="flex justify-start gap-x-2 p-3 cursor-pointer items-center">
                    <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                    <p className="font-EuclidBold">UMKM DIGITAL</p>
                </div>
                {this.state.listMenu.length < 1 && (
                    <div>
                        <Skeleton type="custom" className="w-8/12 h-8 mb-2" />
                        <Skeleton type="custom" className="w-12/12 h-8 mb-2" />
                        <Skeleton type="custom" className="w-5/12 h-8 mb-2" />
                        <Skeleton type="custom" className="w-10/12 h-8 mb-2" />
                    </div>
                )}
                {this.state.listMenu?.map((res) => (
                   <div key={res.id} >
                    {res.children?.length < 1 && (
                    <NavLink to={res.url}>
                        {({ isActive}) =>(
                            <div className={`${
                                isActive ? "bg-gray-800 text-white" : ""
                            } px-3 pt-2.5 pb-3 rounded-lg flex items-center gap-x-2 font-medium`}>
                                <Icon icon={res.icon} className="my-auto" width={20} height={20} color="#7f7f7f"/>
                                <p className="text-sm mr-auto font-EuclidBold">{res.name}</p>
                            </div>
                        )}
                        
                    </NavLink>
                    )}
                    
                    {res.children?.length > 0 && 
                    <div  aria-hidden="true" className="flex justify-start px-3 pt-2.5 pb-3 gap-x-2 p-3 hover:bg-gray-200 cursor-pointer w-full items-center"
                    onClick={() => {
                            this.setState((prevState : any) => {
                                return {
                                    ...prevState,
                                    listMenu: prevState.listMenu.map((menu: any) => {
                                        if (menu.id === res.id) {
                                            return {...menu, show: !menu.show};
                                        } else {
                                            return menu;
                                        }
                                    }),
                                };
                            });
                    }}
                    >
                        <Icon icon={res.icon} className="my-auto" width={20} height={20} color="#7f7f7f"/>
                    <p className="text-sm mr-auto font-EuclidBold">{res.name}</p>
                    {res?.show && res.children?.length > 0 && (
                    <Icon icon="arrow_down" className="my-auto" width={13} height={13}/>
                    )}
                    {!res?.show && res.children?.length > 0 && (
                    <Icon icon="arrow_left_simple" className="my-auto" width={20} height={20} />
                    )}
                    </div>}
                    {res?.show && res.children?.map((child:any) => (
                        <NavLink to={res.url  + child.url}>
                        {({ isActive}) =>(
                        <div aria-hidden="true" key={child.id} className={`${
                            isActive ? "bg-gray-800 text-white" : ""
                        } px-8 pt-2.5 pb-3 rounded-lg flex items-center gap-x-2 font-medium`} >
                            <Icon icon={child.icon} className="my-auto" width={20} height={20} color="#7f7f7f"/>
                            <p className="text-sm font-EuclidBold cursor-pointer">{child?.name}</p>
                        </div>
                        )}
                        
                        </NavLink>
                    ))}
                   </div> 
                ))}
            </div>
            <div className="sm:w-10/12 overflow-y-auto p-7">
                <Outlet></Outlet>
            </div>
        </div>
        );
    }
}

export default withRouterInterface (Dashboard);