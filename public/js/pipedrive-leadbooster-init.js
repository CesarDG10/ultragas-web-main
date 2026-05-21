window.pipedriveLeadboosterConfig = {
  base: 'leadbooster-chat.pipedrive.com',
  companyId: 13395962,
  playbookUuid: 'cd5c6683-9964-4775-9470-efaa7ce0a2f9',
  version: 2,
};

(function () {
  var w = window;
  if (!w.LeadBooster) {
    w.LeadBooster = {
      q: [],
      on: function (n, h) {
        this.q.push({ t: 'o', n: n, h: h });
      },
      trigger: function (n) {
        this.q.push({ t: 't', n: n });
      },
    };
  }
})();

