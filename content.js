let synth = window.speechSynthesis;
let languageMappings = {
    "English": "en-US",
    "French": "fr-FR",
    "Japanese": "ja-JP",
};

let currentLanguage = "en-US";

const ignoreTexts = [
    "English (auto-generated)Click  for settings",
    "Click  for settings",
]

const skipRead = [
    "English (auto-generated)",
    "English (United States)",
    "English (United States) >> French",
    "English (United States) >> Japanese"
];


let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
            if (addedNode.className === "ytp-caption-segment") {
                let text = addedNode.textContent;
                if (!ignoreTexts.includes(text)) {
                    updateLanguage(text);
                    console.log("try added subtitle: ", text);
                    if (skipRead.includes(text)) {
                        continue;
                    }
                    readCaption(text);
                }
            }
        }
    }
});
observer.observe(document, { childList: true, subtree: true });

function updateLanguage(text) {
    if (text.includes(">> French")) {
        currentLanguage = languageMappings["French"];
    } else if (text.includes("English")) {
        currentLanguage = languageMappings["English"];
    } else if (text.includes("Japanese")) {
        currentLanguage = languageMappings["Japanese"];
    }
}


function readCaption(textToRead) {
    if ("speechSynthesis" in window) {
        var utterance = new SpeechSynthesisUtterance();
        utterance.text = textToRead;
        utterance.pitch = 0.2;
        utterance.volume = 3;
        utterance.rate = 1;
        utterance.lang = currentLanguage;
        if (synth) {
            synth.speak(utterance);
        }
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }

    // const ignoreText = "English (auto-generated)Click  for settings"
    // let subtitles = document.getElementsByClassName("captions-text") || [];

    // for (let subtitle of subtitles) {
    //     if (subtitle.textContent !== ignoreText) {
    //         let textToRead = subtitle.innerText;

    //         console.log("subtitle: ", textToRead);

    //         if ("speechSynthesis" in window) {
    //             var utterance = new SpeechSynthesisUtterance();
    //             utterance.text = textToRead;
    //             utterance.pitch = 0.2;
    //             utterance.volume = 3;
    //             utterance.lang = "en-US";
    //             if (synth) {
    //                 synth.speak(utterance);
    //             }
    //         } else {
    //             alert("Sorry, your browser doesn't support text to speech!");
    //         }
    //     } 
    // }
}

