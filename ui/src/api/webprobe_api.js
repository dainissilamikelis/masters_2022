import { handleApi } from "./api";
import {
    ApiGateWayEndPoint,
    definedRouteTypes,
    definedApiMethods,
    definedWebProbeResources,
} from ".";

const getWebProbeData = async (body) => {
    const url = `${ApiGateWayEndPoint}/${definedRouteTypes.webprobe}`;
    return await handleApi(url, definedApiMethods.post, body);
};


export const runWebProbeSolution = async() => {
    const url = `${ApiGateWayEndPoint}/${definedRouteTypes.webprobe}/${definedWebProbeResources.run}`;
    return await handleApi(url, definedApiMethods.get);
}

export const buildWebProbeSolution = async() => {
    const url = `${ApiGateWayEndPoint}/${definedRouteTypes.webprobe}/${definedWebProbeResources.build}`;
    return await handleApi(url, definedApiMethods.get);
}

export const findWebProbeData = async (PK, SK) => {
    const url = `${ApiGateWayEndPoint}/${definedRouteTypes.webprobe}/${definedWebProbeResources.entry}`;
    const body = {
        PK,
        SK,
    };
    const resp = await handleApi(url, definedApiMethods.post, body);
    return resp;
};

export default getWebProbeData;
