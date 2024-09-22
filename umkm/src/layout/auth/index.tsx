import { Component } from "react";
import  Input  from "../../components/Input/Input";
import  Button  from "../../components/Button/Button";
import { login } from "./controller";
import { setCookie } from "typescript-cookie";
import { RouterInterface, withRouterInterface } from "../../router/interface";
class Auth extends Component<RouterInterface> {
    state: Readonly<{
        email: string | undefined;
        password: string | undefined;
        loading: boolean;
    }>;
    constructor(props: RouterInterface) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            loading: false
        };
        this.auth = this.auth.bind(this);
    }

    async auth() {
        this.setState({loading: true});
        await login({...this.state}).then((res) => {
            this.setState({loading: false});
            setCookie('LOG_TOKEN', res.data?.token);
            return this.props.navigate ('/');
        }).catch((err) => {
            console.log(err, 'error');
        })
    }

    render() {
        return ( 
        <div className="h-screen max-h-screen flex justify-center items-center bg-gray-50">
            <div className="rounded-md shadow-xl border border-gray-200 bg-white p-5 w-3/12">
                <h1 className="uppercase font-bold text-sm font-EuclidBold">UMKM</h1>
                <h6 className="mt-6 font-bold text-3xl mb-1">Masuk</h6>
                <p className="text-xs font-EuclidBold">Lorem ipsum dolor sit amet consectetur adipisicings.</p>
                <div  className="mt-5">
                    <Input label="Email" className="font-EuclidReguler" type="text" size="medium" onValueChange={(value: string) => this.setState({email: value})}/>
                    <Input label="Password" type="password" className="mt-3 font-EuclidReguler" size="medium" onValueChange={(value: string) => this.setState({password: value})}/>
                    <Button title="Masuk"  className="mt-8 font-EuclidBold" isLoading={this.state.loading} theme="primary" size="medium" width="full" onClick={this.auth}/>
                </div>
            </div>
        </div>
    );
    }
}

export default withRouterInterface (Auth);