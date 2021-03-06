exports.headers = { "content-type": "application/json" };

exports.logbook_map = {
    created: "createdAt",
    creator: "creator",
    description: "root-cause-comments",
    incidentend: "end-time-cetcest",
    id: "id",
    "Service impact (radio)": "area",
    issuetype: "entry-type",
    incidentstart: "start-time-cetcest",
    summary: "what",
    tenant: "tenant",
    attachment: "files",
};

exports.BAD_KEYS = [
    "fixVersions",
    "lastViewed",
    "aggregatetimeoriginalestimate",
    "versions",
    "aggregatetimeestimate",
    "archiveddate",
    "aggregateprogress",
    "progress",
    "worklog",
    "archivedby",
    "aggregatetimespent",
    "workratio",
    "watches",
    "customfield_10246",
    "incidentguidance",
    "emailheaderin-reply-to",
    "emailheadermessage-id",
    "emailheadermessage-id",
    "development",
    "watchers",
    "timetracking",
    "σprogress",
    "fixversion/s",
    "affectsversion/s",
    "linkedissues",
    "sub-tasks",
    "logwork",
    "requestparticipants",
];

