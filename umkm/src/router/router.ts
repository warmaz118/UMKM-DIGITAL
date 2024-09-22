import { createBrowserRouter, redirect } from "react-router-dom";
import { getCookie } from "typescript-cookie";
export function authNotExist() {
    const token = getCookie('LOG_TOKEN');
    if (!token) {
        return redirect('/auth');
    }
    return null;
}

export function authExist() {
    const token = getCookie('LOG_TOKEN');
    if (token) {
        return redirect('/');
    }
    return null;
}

 const Router = createBrowserRouter([
    {
        path: "/auth",
        async lazy() {
            let Auth = await import("../layout/auth/index");
            return {Component: Auth.default};
        },
        async loader() {
            return authExist();
        }
    },
    {
        path: "/",
        async lazy() {
            let Dashboard = await import("../layout/dashboard/index");
            return {Component: Dashboard.default};
        },
        async loader() {
            return authNotExist();
        },
        children: [
            {
                path: "master",
                children: [
                    {
                        path: "menu",
                        children: [
                            {
                                path: "",
                                async lazy() {
                                    let Menu = await import("../layout/master/menu/index");
                                    return {Component: Menu.default};
                                }
                            }
                            
                        ]
                    },
                    {
                        path: "pengguna",
                        children: [
                            {
                                path: "",
                                async lazy() {
                                    let Pengguna = await import("../layout/master/pengguna/index");
                                    return {Component: Pengguna.default};
                                }
                            }
                            
                        ]
                    }
                ]
            },
        ]
    }
 ]);

 export default Router;