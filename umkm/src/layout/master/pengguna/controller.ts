import client from "../../../service/service";

export function pengguna_index(params?: any) {
    return client.get("/user/userlist", {
        params: params
    });
}