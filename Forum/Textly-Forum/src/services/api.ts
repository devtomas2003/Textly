import axios from "axios";
import { API_POST_SERVER } from "../../env";

export default axios.create({
    baseURL: API_POST_SERVER + "/v1"
});