document.getElementById("user-name").innerHTML = "May"

let synth = window.speechSynthesis;

const text = `
    Placeholder - this can be used to set the voice and speed, and toggle the extension on and off.`;
const playVoice = async () => {
    if ("speechSynthesis" in window) {
        var utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.pitch = 0.2;
        utterance.volume = 3;
        utterance.lang = "en-US";
        if (synth) {
            synth.speak(utterance);
        }
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }
};
document.getElementById("myButton").addEventListener("click", playVoice);
