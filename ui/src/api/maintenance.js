import { handleApi } from "./api";
import { ApiGateWayEndPoint, definedRouteTypes, definedApiMethods } from ".";

const postMaintenance = async (body) => {
  const url = `${ApiGateWayEndPoint}/${definedRouteTypes.maintenances}`;
  const resp = await handleApi(url, definedApiMethods.post, { form: body });
  return resp;
};

export default postMaintenance;
