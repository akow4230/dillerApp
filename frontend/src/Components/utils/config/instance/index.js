import axios from "axios";

export default function (url, method, data) {
    let token = localStorage.getItem("access_token");
    return axios({
        url: "http://localhost:8080" + url,
        method: method,
        data: data,
        headers: {
            "Authorization": token
        }
    }).then((res) => {
        return res.data
    }).catch((err) => {
        if (err.response.status === 401) {
            axios({
                url: `http://localhost:8080/api/v1/auth/refresh?refreshToken=${localStorage.getItem("refresh_token")}`,
                method: "POST"
            }).then((res) => {
                localStorage.setItem("access_token", res.data)
                axios({
                    url: "http://localhost:8080/" + url,
                    method: method,
                    data: data
                }).then((res) => {
                    return res.data;
                }).catch((err) => {
                    console.error(err)
                    return err;
                })
            }).catch((err) => {
                console.error(err)
                return err;
            })
        } else {
            console.error(err)
            return err;
        }
    })
}