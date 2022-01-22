const { headers} = require("./constants");
const { ISO_FORCE_ADJUSTER, NORMALIZE_TIME_FORMAT } = require("./date_helper");

function response_maker(body, code) {
    return {
        statusCode: code,
        headers,
        body: JSON.stringify(body),
    };
}


exports.resolve_maker = (start_time, passed, url, testName, latency, result, status) => {
    const iso_date = start_time.toISOString();
    return {
        start_time: iso_date,
        testName,
        passed,
        url,
        latency,
        result,
        status,
    }
}

exports.resolve_puppeteer_maker = (resolve_value, badCase, loadTime) => {
    let  { passed, latency, result } = resolve_value;
    if (passed) {
        latency = loadTime;
        if (badCase) {
            passed = false
            result = "NOT FOUND"
        }
    }

    return { ...resolve_value, latency, passed, result };
}


const parse_maintenance_entries = (dataArray) => {
    const parsed = [];
    dataArray.forEach((e) => {
        const { maintenance_starttime: date, url_affected: urls } = e;
        const new_date = new Date(date);
        const today = new_date.toISOString();
        const year = new_date.getFullYear().toString();
        const month = ISO_FORCE_ADJUSTER(new_date.getMonth(), true);
        const day = ISO_FORCE_ADJUSTER(new_date.getDate());
        const hour = ISO_FORCE_ADJUSTER(new_date.getHours());
        const minutes = ISO_FORCE_ADJUSTER(new_date.getMinutes());
        const SK = `${year}-${month}-${day} ${hour}:${minutes}:00.000`;
        // adding new entries
        if (Array.isArray(urls) && urls.length > 0) {
            urls.forEach((url) => {
                parsed.push({
                    PK: e.probe,
                    SK: `${SK}__&__${url}`,
                    maintenance_starttime: NORMALIZE_TIME_FORMAT(e.maintenance_starttime),
                    maintenance_endtime: NORMALIZE_TIME_FORMAT(e.maintenance_endtime),
                    year,
                    month,
                    day,
                    hour,
                    minutes,
                    url_affected: url,
                    createdAt: NORMALIZE_TIME_FORMAT(e.createdAt || today),
                    comments: e.comments,
                    outage: e.outage || false,
                });
            });
        } else if (!e.PK && !e.SK) {
            parsed.push({
                PK: e.probe,
                SK: `${SK}__&__${e.service}`,
                maintenance_starttime: NORMALIZE_TIME_FORMAT(e.maintenance_starttime),
                maintenance_endtime: NORMALIZE_TIME_FORMAT(e.maintenance_endtime),
                year,
                month,
                day,
                hour,
                minutes,
                url_affected: e.service,
                createdAt: NORMALIZE_TIME_FORMAT(e.createdAt || today),
                comments: e.comments,
                outage: e.outage || false,
            });
        } else {
            parsed.push({ ...e });
        }
    });

    return parsed;
};

module.exports.parse_maintenance_entries = parse_maintenance_entries;
module.exports.response_maker = response_maker;
