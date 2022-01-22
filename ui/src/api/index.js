export const definedApiMethods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
    any: "ANY",
};

export const ApiGateWayEndPoint = process.env.REACT_APP_GATEWAY;
export const SsoEndpoint = `${process.env.REACT_APP_GATEWAY}/sso`;

export const definedRouteTypes = {
    find: "find",
    maintenances: "maintenances",
    query: "query",
    webprobe: "webprobe",
    delete: "delete",
    version: "version",
};


export const definedWebProbeResources = {
    entry: "entry",
    run: "run",
    build: "build"
 };

const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const date_fields = [
    "maintenance_starttime",
    "maintenance_endtime",
    "start-time-cetcest",
    "end-time-cetcest",
];

const iso_force_adjuster = (number, addOne) => {
    let add = addOne ? number + 1 : number;
    const new_number = add < 10 ? `0${add}` : add;
    return new_number;
};

export const date_formatter = (date) => {
    if (date && date instanceof Date) {
        const new_date = date;
        const year = new_date.getFullYear();
        const month = iso_force_adjuster(new_date.getMonth(), true);
        const day = iso_force_adjuster(new_date.getDate());
        const hour = iso_force_adjuster(new_date.getHours());
        const minutes = iso_force_adjuster(new_date.getMinutes());
        const seconds = iso_force_adjuster(new_date.getSeconds());
        const formatted_date = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.000Z`;
        return formatted_date;
    } else if (typeof date === "string") {
        date_formatter(new Date(date));
    }
    return null;
};

// currently forcing all dates to be passed to back-end be treated as UTC
// this should be moved to lambda normalizers at one point
const date_adjust_object = (body) => {
    const new_body = {};
    if (typeof body === "string") return body;
    Object.keys(body).forEach((k) => {
        let value = body[k];
        if (date_fields.includes(k)) {
            value = date_formatter(body[k]);
        }
        new_body[k] = value;
    });
    return new_body;
};

const date_field_adjuster = (body) => {
    let new_body = {};
    Object.keys(body).forEach((k) => {
        let value = body[k];
        if (Array.isArray(value)) {
            value = value.map((el) => date_adjust_object(el));
        } else {
            if (value instanceof Date) {
                value = date_formatter(value);
            } else if (typeof value === "object") {
                value = date_adjust_object(value);
            }
        }
        new_body[k] = value;
    });

    return new_body;
};

export const ApiSettingsMaker = (method, body) => {
    const settings = {
        method,
        headers: {
            ...defaultHeaders,
            Authorization: sessionStorage.getItem("token"),
            user: sessionStorage.getItem("user"),
        },
    };

    if (body) {
        settings["body"] = JSON.stringify({
            ...date_field_adjuster(body),
            user: sessionStorage.getItem("user"),
        });
    }

    return settings;
};

export const GetSettings = {
    method: "GET",
};
