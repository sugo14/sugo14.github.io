const themeCnt = 4;

let currTheme = localStorage.getItem("theme");
if (currTheme === null) { currTheme = 0; }
else { currTheme = parseInt(currTheme); }
document.documentElement.setAttribute("theme", currTheme);

function toggleTheme() {
    currTheme = (currTheme + 1) % themeCnt;
    document.documentElement.setAttribute("theme", currTheme);
    localStorage.setItem("theme", currTheme);
}
window.toggleTheme = toggleTheme;
