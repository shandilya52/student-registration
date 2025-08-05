// ✅ Form Step Navigation
let currentStep = 0;
const formSteps = document.querySelectorAll(".form-step");
const progress = document.querySelector(".progress");

function showStep(step) {
  formSteps.forEach((fs, i) => {
    fs.classList.toggle("active", i === step);
  });
  progress.style.width = `${((step + 1) / formSteps.length) * 100}%`;
}

function nextStep() {
  if (currentStep < formSteps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

showStep(currentStep);

// ✅ Voice Input Feature
function startVoiceInput(fieldId) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';

  recognition.onresult = function (event) {
    document.getElementById(fieldId).value = event.results[0][0].transcript;
  };

  recognition.start();
}

// ✅ Course Icon Preview
document.getElementById("course").addEventListener("change", function () {
  const iconBox = document.getElementById("courseIcon");
  const value = this.value;

  const icons = {
    "Cyber Security": "🔐",
    "Full Stack Development": "💻",
    "AI / ML": "🤖",
    "Software Development": "🧑‍💻",
    "Data Science": "📊"
  };

  iconBox.textContent = icons[value] || "";
});

// ✅ Form Submission (frontend preview only)
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const resultBox = document.getElementById("result");

  let output = `
    <h3>🎓 Registered Details</h3>
    <p><strong>Name:</strong> ${formData.get("name")}</p>
    <p><strong>Email:</strong> ${formData.get("email")}</p>
    <p><strong>Phone:</strong> ${formData.get("phone")}</p>
    <p><strong>DOB:</strong> ${formData.get("dob")}</p>
    <p><strong>Gender:</strong> ${formData.get("gender")}</p>
    <p><strong>Course:</strong> ${formData.get("course")}</p>
    <p><strong>Address:</strong> ${formData.get("address")}</p>
  `;

  resultBox.innerHTML = output;
  resultBox.classList.add("show");
  resultBox.style.display = "block";

  document.getElementById("pdf-controls").style.display = "block";

  showToast("🎉 Registration successful!");
  confettiEffect();
});

// ✅ Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ✅ Confetti Animation
function confettiEffect() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// ✅ PDF Download
function downloadPDF() {
  const result = document.getElementById("result");
  const opt = {
    margin: 0.5,
    filename: 'Student_Registration.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(result).set(opt).save();
}
