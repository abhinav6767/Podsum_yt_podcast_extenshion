// send the page title as a chrome message
console.log("I am on");
let string_with_timestamps_and_linebreaks = "";
function letsgo() {
  console.log("I got Clicked");
  var s = document
    .getElementsByClassName(
      "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button "
    )[1]
    .click();

  console.log(s);

  var a1 = document.getElementsByClassName(
    "style-scope ytd-menu-service-item-renderer"
  );
  for (var i = 0; i < a1.length; i++) {
    if (a1[i].innerHTML === "Show transcript") {
      var specificElement = a1[i];
      break;
    }
  }
  console.log(specificElement);

  specificElement.click();

  var ss = document.getElementsByClassName(
    "style-scope ytd-transcript-search-panel-renderer"
  );

  var s1 = ss.body;

  console.log(s1.textContent);

  string_with_timestamps_and_linebreaks = s1.textContent;

  // Define regular expression to match both timestamps (in this case, M:S or H:M:S format) and line breaks
  let pattern = /(\n|\b\d+:\d+|\b\d+:\d+:\d+)\b/g;

  // Use regular expression to remove timestamps and line breaks from string
  let string_without_timestamps_and_linebreaks =
    string_with_timestamps_and_linebreaks.replace(pattern, "");

  console.log(string_without_timestamps_and_linebreaks);
  chrome.runtime.sendMessage({
    message: string_without_timestamps_and_linebreaks,
  });
}

// code to be executed after all resources have finished loading
//   console.log("Page loaded completely");

function mainfunction() {
  let interval = setInterval(() => {
    if (string_with_timestamps_and_linebreaks == "") {
      setTimeout(letsgo, 1000);
    } else clearInterval(interval);
  }, 100);
}
mainfunction();
