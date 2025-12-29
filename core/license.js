const License = {
  key: "pos_license",

  get() {
    return Storage.get(this.key) || { active:false, type:"FREE" };
  },

  isPro() {
    return this.get().active && this.get().type === "PRO";
  },

  activate(code) {
    // أمثلة أكواد (غيرها وقت البيع)
    const validCodes = [
      "POS-PRO-2025",
      "SONBATY-PRO",
      "CASHIER-999"
    ];

    if (!validCodes.includes(code)) return false;

    Storage.set(this.key, {
      active: true,
      type: "PRO",
      date: new Date().toLocaleDateString()
    });
    return true;
  },

  deactivate() {
    Storage.remove(this.key);
  }
};
