const newLogo = `
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    class="r-16ek5rh r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
  >
    <g>
      <path d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"></path>
    </g>
  </svg>
`;

const oldLogo = `
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    class="r-16ek5rh r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
    style="color: rgba(29,155,240,1.00)"
  >
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
`;

const oldSplashLogo = `
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    class="r-16ek5rh r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
    style="color: rgba(29,155,240,1.00);width: 72px;height: 72pxmargin-bottom: auto;margin-left: auto;margin-right: auto;margin-top: auto;top: 0px;bottom: 0px;right: 0px;left: 0px"
  >
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
`;

function getElementsByXPath(expression, parentElement) {
  var r = [];
  var x = document.evaluate(
    expression,
    parentElement || document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (var i = 0, l = x.snapshotLength; i < l; i++) {
    r.push(x.snapshotItem(i));
  }
  return r;
}

// favicon window logo and title
function faviconTitleReplace() {
  var state = localStorage.getItem("enableBluebird");
  // favicon
  const linkDOM = document.getElementsByTagName("link");
  for (let i = 0; i < linkDOM.length; i++) {
    const element = linkDOM[i];
    if (element.rel === "shortcut icon") {
      if (state === "on") {
        element.href = element.href.replace("3", "2");
      } else {
        element.href = element.href.replace("2", "3");
      }
    }
  }

  // title (og)
  const metaDOM = document.getElementsByTagName("meta");
  for (let i = 0; i < metaDOM.length; i++) {
    const element = metaDOM[i];
    if (
      element.content.indexOf("/ X") !== -1 ||
      element.content.indexOf("/ Twitter") !== -1
    ) {
      if (state === "on") {
        element.content = element.content.replace("X", "Twitter");
      } else {
        element.content = element.content.replace("Twitter", "X");
      }
    }
  }

  // title (main)
  const titleDOM = document.getElementsByTagName("title");
  if (titleDOM.length > 0) {
    if (state === "on" && titleDOM[0].innerHTML.indexOf("X") !== -1) {
      titleDOM[0].innerHTML = titleDOM[0].innerHTML.replace("X", "Twitter");
    } else if (
      state === "off" &&
      titleDOM[0].innerHTML.indexOf("Twitter") !== -1
    ) {
      titleDOM[0].innerHTML = titleDOM[0].innerHTML.replace("Twitter", "X");
    }
  }
}

var state = localStorage.getItem("enableBluebird");
if (!state) {
  state = "off";
  localStorage.setItem("enableBluebird", "off");
} else if (state === "on") {
  const mainLogoInterval = setInterval(mainLogoReplace);
  const splashLogoInterval = setInterval(splashLogoReplace);
  setInterval(faviconTitleReplace);

  // main window logo
  function mainLogoReplace() {
    const logoDOM = getElementsByXPath("//h1/a/div");
    if (logoDOM.length > 0) {
      logoDOM[0].innerHTML = oldLogo;
      clearInterval(mainLogoInterval);
    }
  }

  // splash window logo
  function splashLogoReplace() {
    const logoDOM = getElementsByXPath('//div[@aria-label="Loading…"]');
    if (logoDOM.length > 0) {
      logoDOM[0].innerHTML = oldSplashLogo;
      clearInterval(splashLogoInterval);
    }
  }
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.cmd === "check") {
    // check init state
    var state = localStorage.getItem("enableBluebird");
    if (!state) {
      state = "off";
      localStorage.setItem("enableBluebird", "off");
    }
    sendResponse(state);
  } else if (msg.cmd == "replace") {
    // run replace
    var logoDOM = getElementsByXPath("//h1/a/div");
    if (logoDOM.length === 0) {
      sendResponse(undefined);
    } else {
      if (msg.replace) {
        logoDOM[0].innerHTML = oldLogo;
        localStorage.setItem("enableBluebird", "on");
      } else {
        logoDOM[0].innerHTML = newLogo;
        localStorage.setItem("enableBluebird", "off");
      }
    }
    sendResponse(undefined);
  }
});
