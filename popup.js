// // Inject the payload.js script into the current tab after the popout has loaded
// import { mainfunction } from "./payload";

window.addEventListener("load", function (evt) {
  chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
    file: "payload.js",
  });
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
    file: "payload.js",
  });
});
// add api key here
const API_KEY = ""; 
function generate(userdata){
fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: `Summerize this " ${userdata} " under 20 words in bullet point and provide new line with every new bullet point
     `}
    ]
  })
})
  .then((response) => response.json())
    .then((data) => {
      console.log(data);
    let  mydata="";
    // Do something with the response data]
    for(let element of data.choices){
      mydata=mydata+element.message.content+"\n";
    }




    // for (let i = 0; i < data.choices.length; i++) {
    //   mydata=mydata+data.choices[i].message.content+"\n";
    // }
    document.getElementById("pagesubject").innerHTML = mydata;
  
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.log(error);
  });
}



// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
  let waitTime = 2000; // in milliseconds
  let intervalTime = 500; // in milliseconds

  let intervalId = setInterval(function () {
    if (message.message) {
      console.log(message.message);
      clearInterval(intervalId);
      // Execute code when condition is met
      data = message.message;

      document.getElementById("pagesubject1").innerHTML = data;
      generate(data);
      //document.getElementById("pagesubject").innerHTML = GenerateSummery(data);

      // let childNode = document.getElementById("pagesubject").children[0];
      // document.getElementById("pagesubject").removeChild(childNode);
      let a = document.getElementById("pagesubject");
      let b = document.getElementById("id");

      // removeElement(a);
      // removeElement(b);
      console.log("Condition met!");
    }
    waitTime -= intervalTime;
    if (waitTime < 0) {
      clearInterval(intervalId);
      // Execute code if condition is not met after timeout
      document.getElementById("pagesubject1").innerHTML =
        "failed to load transcript try this on Another Video Pls";
      console.log("Condition not met after timeout!");
    }
  }, intervalTime);
});

function removeElement(a) {
  // Get the element to be removed

  // Check if the element exists
  if (a !== null) {
    // Remove the element from the DOM
    a.remove();
  } else {
    // Handle the case where the element doesn't exist
    console.log("Element " + a + " not found!");
  }
}

