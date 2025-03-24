import { postRequest } from "./requests"

export const postReportAsync = async (data : any ) => {
    return await postRequest( "/report", data)
}
