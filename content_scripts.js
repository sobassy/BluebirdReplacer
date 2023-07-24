document.addEventListener("DOMContentLoaded", function () {
  // get initial val
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { cmd: "check" }, function (msg) {
      if (msg === "on") {
        document.getElementById("toggle-val").checked = true;
      } else {
        document.getElementById("toggle-val").checked = false;
      }
    });
  });

  // add event listener at toggle
  document.getElementById("toggle-val").addEventListener("change", function () {
    if (this.checked) {
      // on
      localStorage.setItem("enableBluebird", "on");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { cmd: "replace", replace: true },
          function (msg) {}
        );
      });
    } else {
      // off
      localStorage.setItem("enableBluebird", "off");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { cmd: "replace", replace: false },
          function (msg) {}
        );
      });
    }
  });
});
