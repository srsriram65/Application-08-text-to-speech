let speech = window.speechSynthesis;

let voices = [];

let voiceSelect = document.getElementById("voiceSelect");

let textInput = document.getElementById("textInput");


// Load available voices
function loadVoices() {

    voices = speech.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach(function(voice, index) {

        let option = document.createElement("option");

        option.value = index;

        option.textContent =
            voice.name + " - " + voice.lang;

        voiceSelect.appendChild(option);
    });
}

loadVoices();

speech.onvoiceschanged = loadVoices;


// Speak
function speakText() {

    let text = textInput.value.trim();

    if (text === "") {

        alert("Please enter some text first.");

        return;
    }

    speech.cancel();

    let message = new SpeechSynthesisUtterance(text);

    let selectedVoice =
        voices[voiceSelect.value];

    if (selectedVoice) {
        message.voice = selectedVoice;
    }

    message.rate =
        document.getElementById("speed").value;

    message.pitch =
        document.getElementById("pitch").value;

    message.volume =
        document.getElementById("volume").value;


    message.onstart = function() {

        document.getElementById("status").innerText =
            "🔊 Speaking...";
    };


    message.onend = function() {

        document.getElementById("status").innerText =
            "🟢 Finished speaking";
    };


    speech.speak(message);
}


// Pause
function pauseSpeech() {

    speech.pause();

    document.getElementById("status").innerText =
        "⏸️ Speech paused";
}


// Resume
function resumeSpeech() {

    speech.resume();

    document.getElementById("status").innerText =
        "▶️ Speech resumed";
}


// Stop
function stopSpeech() {

    speech.cancel();

    document.getElementById("status").innerText =
        "⏹️ Speech stopped";
}


// Clear
function clearText() {

    textInput.value = "";

    updateCount();

    stopSpeech();
}


// Copy
function copyText() {

    if (textInput.value.trim() === "") {

        alert("There is no text to copy.");

        return;
    }

    navigator.clipboard.writeText(textInput.value);

    document.getElementById("status").innerText =
        "📋 Text copied!";
}


// Word and character count
function updateCount() {

    let text = textInput.value.trim();

    let words =
        text === "" ? 0 : text.split(/\s+/).length;

    let characters =
        textInput.value.length;

    document.getElementById("wordCount").innerText =
        words + " Words";

    document.getElementById("charCount").innerText =
        characters + " Characters";
}

textInput.addEventListener(
    "input",
    updateCount
);


// Speed
document.getElementById("speed")
    .addEventListener("input", function() {

        document.getElementById("speedValue").innerText =
            this.value + "x";
    });


// Pitch
document.getElementById("pitch")
    .addEventListener("input", function() {

        document.getElementById("pitchValue").innerText =
            this.value;
    });


// Volume
document.getElementById("volume")
    .addEventListener("input", function() {

        document.getElementById("volumeValue").innerText =
            Math.round(this.value * 100) + "%";
    });
