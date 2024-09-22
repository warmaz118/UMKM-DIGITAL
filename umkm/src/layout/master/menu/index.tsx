import { Component } from "react";
import { RouterInterface, withRouterInterface } from "../../../router/interface";
import { menu_index } from "./controller";
import { Table } from "../../../components";

class Index extends Component <RouterInterface> {
    state: Readonly<{
        menu: any;
    }>;

    constructor(props: RouterInterface) {
        super(props);
        this.state = {
            menu: {
                column : [],
                data : [],
            },
        };

        this.callIndex = this.callIndex.bind(this);
    }

    componentDidMount(): void {
        this.callIndex();
    }

    callIndex(page?: number) {
        menu_index().then((res) => {
            this.setState({menu: res});
        });
    }
    render() : React.ReactNode {
        return (
            <div>
                <Table 
                column={this.state.menu.column} 
                title="Management Menu" 
                useCreate = {false}
                useHeadline
                data={this.state.menu!.data}  
                />
            </div>
        );
    }
}

export default withRouterInterface(Index);