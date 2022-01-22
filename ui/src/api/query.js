import { handleApi } from "./api";
import {
  ApiGateWayEndPoint,
  definedApiMethods,
  definedRouteTypes,
} from ".";

const postQuery = async (query, MAINTENANCE = false) => {
  const url = `${ApiGateWayEndPoint}/${definedRouteTypes.query}`;
  const resp = await handleApi(url, definedApiMethods.post, { ...query, MAINTENANCE });
  return resp;
};

export default postQuery;
