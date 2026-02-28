export const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)";
    toast.style.color = "white";
    toast.style.padding = "1rem 2rem";
    toast.style.borderRadius = "100px";
    toast.style.boxShadow = "0 10px 30px rgba(6, 182, 212, 0.4)";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "600";
    toast.style.animation = "revealUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "all 0.5s ease";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};
