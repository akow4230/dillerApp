import instance from "../../Components/utils/config/instance";

const DashboardService = {
    async getMainData() {
        return await instance("/api/v1/company/dashboard", "GET", null)
    }
};

export default DashboardService;