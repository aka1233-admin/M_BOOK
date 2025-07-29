const keywords = [
  "Vascular Intervention",
  "Generic",
  "Access Sheath",
  "Angiographic Imaging",
  "Angioplasty",
  "Anticoagulation Therapy",
  "Arterial Access",
  "Arterial Occlusion",
  "Atherosclerosis",
  "Atrial Septal Defect (ASD)",
  "Balloon Deflation",
  "Balloon Inflation",
  "Cardiac Catheterization",
  "Cardiovascular Devices",
  "Catheterization",
  "Chronic Total Occlusion (CTO)",
  "Clinical Trials",
  "Coarctation of the Aorta",
  "Congenital Heart Defects",
  "Congenital Heart Disease",
  "Coronary Angiography"
];
async function makeTextToSpeechCall(text) {
  try {
    const res = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "api-subscription-key": "sk_ydk1b5db_Ut4Gw4gQW8b4ZN4chcsMvNQT",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        target_language_code: "en-IN", // Indian English
        speaker: "anushka",
        pitch: 0,
        loudness: 1,
        pace: 0.9,
        speech_sample_rate: "24000",
        model: "bulbul:v2",
      }),
    });
    const body = await res.json();
    if (body.audios?.length) {
      new Audio(`data:audio/mp3;base64,${body.audios[0]}`).play();
    } else {
      console.error("No audio for:", text);
    }
  } catch (err) {
    console.error("TTS Error:", err);
  }
}

function createTTSButton(text) {
  const btn = document.createElement("button");
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         width="12" height="12">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463
               8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75
               0 0 1 1.28.53v15.88a.75.75 0 0
               1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009
               9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806
               8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
  `;
  Object.assign(btn.style, {
    display: "inline-block",
    marginLeft: "4px",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    verticalAlign: "middle",
  });
  btn.title = `Speak: ${text}`;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.disabled = true;
    makeTextToSpeechCall(text).finally(() => {
      btn.disabled = false;
    });
  });
  return btn;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("h3").forEach((el) => {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    const match = keywords.find((k) =>
      text.toLowerCase().includes(k.toLowerCase())
    );
    if (match) {
      const button = createTTSButton(match);
      el.appendChild(button);
    }
  });
});