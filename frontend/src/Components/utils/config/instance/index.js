import axios from "axios";

export default function instance(url, method, data) {
    const token = localStorage.getItem("access_token");

    const instance = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            Authorization: token,
        },
    });

    return instance({
        url,
        method,
        data,
    })
        .then((res) => {
            if (res.data) {
                return {
                    error: false,
                    data: res.data,
                };
            }
        })
        .catch((err) => {
            if (err.response.status === 401) {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    console.log("User is not authenticated. Redirecting to login page...");
                    // Handle redirection to login page here, you may use 'window.location.href = "/login";'
                    return {
                        error: true,
                        data: err.response.data,
                    };
                }

                console.log("Refreshing access token...");

                return axios
                    .post(`http://localhost:8080/api/v1/auth/refresh?refreshToken=${refreshToken}`)
                    .then((res) => {
                        const newAccessToken = res.data;
                        localStorage.setItem("access_token", newAccessToken);

                        // Retry the original request with the new access token
                        return instance({
                            url,
                            method,
                            data,
                        }).then((res) => {
                            return {
                                error: false,
                                data: res.data,
                            };
                        });
                    })
                    .catch((err) => {
                        console.log("Failed to refresh access token.");
                        // Handle redirection to login page here, you may use 'window.location.href = "/login";'
                        return {
                            error: true,
                            data: err.response.data,
                        };
                    });
            } else {
                return {
                    error: true,
                    data: err.response.data,
                };
            }
        });
}
