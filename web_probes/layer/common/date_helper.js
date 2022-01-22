const normalize_time_format = (timeFormat) => {
    let new_value = timeFormat;
    if (timeFormat) {
        new_value = new_value.replace("T", " ").trim();
        new_value = new_value.replace("Z", " ").trim();
        new_value = new_value.split(":");
        new_value.pop();
        new_value = `${new_value.join(":")}:00.000`;
        return new_value;
    }
    return null;
};

const normalize_durations_value = (start, end) => {
    if (start && end) {
        const start_time = new Date(start);
        const end_time = new Date(end);
        const difference = end_time - start_time;
        if (difference > 0) {
            const value = difference / 1000;
            const duration = Math.floor(value);
            return duration;
        }
        return difference;
    }
    return 0;
};

const iso_force_adjuster = (number, addOne) => {
    let add = addOne ? number + 1 : number;
    const new_number = add < 10 ? `0${add}` : add.toString();
    return new_number;
};

const jira_date_formatter = (date, force = false) => {
    if ((!date || typeof date !== "string") && !force) {
        return "";
    }
    const new_date = date ? new Date(date) : new Date();
    const year = new_date.getUTCFullYear();
    const month = iso_force_adjuster(new_date.getUTCMonth(), true);
    const day = iso_force_adjuster(new_date.getUTCDate());
    const hour = iso_force_adjuster(new_date.getUTCHours());
    const minutes = iso_force_adjuster(new_date.getUTCMinutes());
    const seconds = iso_force_adjuster(new_date.getUTCSeconds());
    const formatted_date = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}.000Z`;
    return formatted_date;
};

module.exports.NORMALIZE_TIME_FORMAT = normalize_time_format;
module.exports.ISO_FORCE_ADJUSTER = iso_force_adjuster;
module.exports.JIRA_DATE_FORMATTER = jira_date_formatter;
module.exports.NORMALIZE_DURATION_VALUE = normalize_durations_value;
