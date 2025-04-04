const protectRoute = (allowedRoles) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !allowedRoles.includes(role)) {
        alert("Unauthorized! Redirecting...");
        window.location.href = "login.html";
    }
};

// Example Usage in admin.html
document.addEventListener("DOMContentLoaded", () => {
    protectRoute(["admin"]); // Only Admins can access
});
// Example Usage in user.html
document.addEventListener("DOMContentLoaded", () => {
    protectRoute(["user"]); // Only Users can access
});
// Example Usage in student.html
document.addEventListener("DOMContentLoaded", () => {
    protectRoute(["student"]); // Only Students can access
});
