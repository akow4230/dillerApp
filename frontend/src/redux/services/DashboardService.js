import instance from "../../Components/utils/config/instance/index";

const DashboardService = {
    async getMainData() {
        return await instance("/api/v1/company/dashboard", "GET", null);
    },
};

export default DashboardService;
