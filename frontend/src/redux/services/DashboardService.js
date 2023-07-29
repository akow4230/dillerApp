import myAxiosFunction from "../../Components/utils/config/instance/index";

const DashboardService = {
    async getMainData() {
        return await myAxiosFunction("/api/v1/company/dashboard", "GET", null);
    },
};

export default DashboardService;
