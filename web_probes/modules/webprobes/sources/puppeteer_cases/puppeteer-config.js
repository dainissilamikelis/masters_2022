const observe = [
  'Page.loadEventFired',
  'Page.domContentEventFired',
  'Page.frameStartedLoading',
  'Page.frameAttached',
  'Network.requestWillBeSent',
  'Network.requestServedFromCache',
  'Network.dataReceived',
  'Network.responseReceived',
  'Network.resourceChangedPriority',
  'Network.loadingFinished',
  'Network.loadingFailed',
];

const defaultViewport = {
  width: 1920,
  height: 1080,
}

const defined_actions = {
  waitForSelector: "waitForSelector",
  waitForNavigation: "waitForNavigation",
  click: "click",
  type: "type",
  secure_type: "secure_type",
  complex: "complex",
  screenshot: "screenshot",
  evaluate: "evaluate",
  evaluate_url: "evaluate url",
  goto: "goto",
  evaluate_content: "evaluate content",
}

const data_src = `/tmp`;
const screen_shot_src = process.env.BUCKET;

const HarData = ({ log }) => {
    let loadTime = 0;

    const { entries } = log;
    const startTime = new Date(entries[0].startedDateTime);

    entries.forEach((entry) => {
      const entryLoadTime = new Date(entry.startedDateTime);
      entryLoadTime.setMilliseconds(entryLoadTime.getMilliseconds() + entry.time);
        if (entryLoadTime > loadTime) {
          loadTime = entryLoadTime;
        }
      });

      const loadTimeSpan = loadTime - startTime;
      return { loadTime: loadTimeSpan, startTime };
  };
  
module.exports.HarData = HarData;
module.exports.defined_actions= defined_actions;
module.exports.data_src = data_src;
module.exports.defaultViewport = defaultViewport;
module.exports.observe= observe;
module.exports.screen_shot_src = screen_shot_src;