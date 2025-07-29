// === TTS Initialization Script ===
const processedElements = new WeakSet();
const processedGroups = new WeakSet();

const phrases = [
  "Vascular Intervention",
  "Coronary",
  "Congenital Heart",
  "Heart Valves",
  "Structural Heart",
  "Peripheral Vascular",
  "Vascular Intervention",
  "Generic",
  "Access Sheath",
  "Angiographic Imaging",
  "Angioplasty",
  "Anticoagulation Therapy",
  "Arterial Access",
  "Arterial Occlusion",
  "Atherosclerosis",
  "Atrial Septal Defect",
  "Balloon Deflation",
  "Balloon Inflation",
  "Cardiac Catheterization",
  "Cardiovascular Devices",
  "Catheterization",
  "Chronic Total Occlusion",
  "Clinical Trials",
  "Coarctation of the Aorta",
  "Congenital Heart Defects",
  "Congenital Heart Disease",
  "Coronary Angiography",
  "Coronary Artery Disease",
  "Coronary Intervention",
  "Coronary Revascularization",
  "Device Maintenance",
  "Device Performance",
  "Device Selection Criteria",
  "Device Sterilization",
  "Embolization",
  "Endarterectomy",
  "Endovenous Ablation",
];

// ✅ API integration
async function makeTextToSpeechCall(text) {
  try {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "api-subscription-key": "sk_ydk1b5db_Ut4Gw4gQW8b4ZN4chcsMvNQT",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        target_language_code: "en-IN",
        speaker: "anushka",
        pitch: 0,
        loudness: 1,
        pace: 0.9,
        speech_sample_rate: "24000",
        model: "bulbul:v2",
      }),
    });

    const body = await response.json();
    if (body.audios && body.audios.length > 0) {
      const audio = new Audio(`data:audio/mp3;base64,${body.audios[0]}`);
      await audio.play();
    } else {
      console.error("No audio received for:", text);
    }
  } catch (err) {
    console.error("TTS Error for", text, ":", err);
  }
}

// ✅ Clean text content
function cleanText(text) {
  return text.replace(/&#160;/g, " ").replace(/\s+/g, " ").trim();
}

// ✅ Button creation
function createTTSButton(text) {
  const button = document.createElement("button");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         width="12" height="12">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463
               8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75
               0 0 1 1.28.53v15.88a.75.75 0 0
               1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009
               9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806
               8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>`;
  button.setAttribute("title", `Speak: ${text}`);
  button.dataset.text = text;
  button.classList.add("tts-button");

  Object.assign(button.style, {
    marginLeft: "6px",
    background: "transparent",
    border: "0",
    cursor: "pointer",
    fontSize: "40px",
    color: "black"
  });

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.style.opacity = "0.5"; // visual feedback
    await makeTextToSpeechCall(text);
    button.disabled = false;
    button.style.opacity = "1";
  });

  return button;
}

// ✅ Insert button next to an element
function addInlineTTSButton(element, text) {
  if (processedElements.has(element)) return;
  processedElements.add(element);
  const btn = createTTSButton(text);
  element.appendChild(btn);
}

// ✅ Search for target phrases inside <h3> tags
function injectSpeakButtonsForBoldTerms(container = document) {
  const boldElements = Array.from(container.querySelectorAll("h3"));
  boldElements.forEach((el) => {
    if (processedElements.has(el)) return;
    const text = cleanText(el.textContent);
    if (phrases.some((p) => text.includes(p))) {
      addInlineTTSButton(el, text);
    }
  });
}

// ✅ Init all logic
function initializeTTS() {
  setTimeout(() => {
    injectSpeakButtonsForBoldTerms();
  }, 200);
}

// ✅ DOM Ready Hook
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTTS);
} else {
  initializeTTS();
}
