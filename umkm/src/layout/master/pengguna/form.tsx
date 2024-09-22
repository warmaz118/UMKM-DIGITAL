import { Component, ReactNode } from "react";
import { RouterInterface, withRouterInterface } from "../../../router/interface";
import Form from "../../../components/Form/Form";
import { FormProps } from "../../../components/Form/model";
import { pengguna_form } from "./controller";
import { Button } from "@angelineuniverse/design";
import  Icon  from "../../../components/Icon/Icon";
class  FormData extends Component <RouterInterface> {

    state: Readonly<{
        form: Array<FormProps> | undefined;
    }>;
    constructor(props: RouterInterface) {
        super(props);
        this.state = {
            form:  undefined,
        };

        this.callForm = this.callForm.bind(this);
    }

    componentDidMount(): void {
        this.callForm();
    }

    callForm() {
       return pengguna_form().then((res) => {
            this.setState({form: res.data});
        });
    }

    render(): ReactNode {
        return  (
        <div> 
            <div className="mb-10 flex justify-start items-center gap-4">
                <div>
                    <Icon icon="arrow_left" color="#dc2626" width={30} height={30} />
                </div>
                <div className="block">
                    <h1 className="font-EuclidBold md:text-xl">Form Pengguna</h1>
                    <p className="text-sm">Pastikan data yang anda masukkan benar dan terisi semua</p>
                </div>
            </div>
            <Form 
            form={this.state.form!} 
            lengthLoading={5} 
            classNameLoading="grid grid-cols-3 gap-4"
            className="grid grid-cols-3 gap-4 font-semibold" 
            />
           
            <Button
            title="Simpan"
            theme="primary"
            size="medium"
            className="font-EuclidBold mt-5"
            width="block"
            isLoading
            onClick={() => {
                console.log(this.state.form);
            }}
            />
        </div>
        );
        
    }
}

export default withRouterInterface(FormData);