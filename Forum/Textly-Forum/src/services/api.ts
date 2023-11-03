import axios from "axios";
import { API_FORUM_SERVER } from "../../env";

export default axios.create({
    baseURL: API_FORUM_SERVER + "/v1",
    timeout: 5000
});