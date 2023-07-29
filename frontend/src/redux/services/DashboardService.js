import instance from "../../Components/utils/config/instance";

const DashboardService = {
    async getMainData() {
        const x = await instance("/api/v1/company/dashboard", "GET", null)
        console.log(x)
        return x;
    }
};

export default DashboardService;