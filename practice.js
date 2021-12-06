const crypto = require("crypto");

const resetToken = crypto.randomBytes(50).toString("hex");
resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
resetPasswordExpire = Date.now() + 10 * (60 * 1000);

console.log(resetToken);
console.log(resetPasswordToken);
console.log(new Date(resetPasswordExpire).toLocaleString());
