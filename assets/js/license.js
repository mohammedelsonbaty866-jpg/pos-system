// ===== LICENSE SYSTEM =====

// أكواد التفعيل الصحيحة (غيرهم قبل البيع)
const VALID_LICENSES = [
  "POS-2025-AAA",
  "POS-2025-BBB",
  "POS-2025-CCC"
];

// بصمة الجهاز
function getDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = "DEV-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("device_id", id);
  }
  return id;
}

// تفعيل
function activateLicense() {
  const code = document.getElementById("licenseCode").value.trim();
  const device = getDeviceId();

  if (!VALID_LICENSES.includes(code)) {
    alert("❌ كود التفعيل غير صحيح");
    return;
  }

  const licenseData = {
    code,
    device,
    activatedAt: new Date().toISOString(),
    type: "PRO" // PRO / BASIC
  };

  localStorage.setItem("pos_license", JSON.stringify(licenseData));
  alert("✅ تم التفعيل بنجاح");
  location.href = "index.html";
}

// تحقق من التفعيل
function isActivated() {
  const data = localStorage.getItem("pos_license");
  if (!data) return false;

  const lic = JSON.parse(data);
  return lic.device === getDeviceId();
}
