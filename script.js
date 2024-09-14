// Get the root element to have access to variables
const root = document.querySelector(":root");

// Get all the sections of the DOM
const main_element = document.querySelector("main");
const main_section = document.getElementById("anthony_section");
const about_section = document.getElementById("about_section");
const nav_menu = document.getElementById("nav_menu");

// Get button for navigation
const nav_button = document.getElementById("nav_button");
const nav_button_event = new Event("menutrigger");
var nav_button_active = false;

nav_button.addEventListener("menutrigger", () => {
    if(nav_button_active) {
        nav_menu.style.visibility = "visible";
        nav_button.style.background = "url(icons/menu_highlighted.png) center/100% no-repeat";
    }
    else {
        nav_menu.style.visibility = "hidden";
        nav_button.style.background = "url(icons/menu.png) center/100% no-repeat";
    }
});

//nav_menu.addEventListener("click", triggerNavButton);

nav_button.addEventListener("click", triggerNavButton);

window.addEventListener("resize", () => {
    if(window.innerWidth > 1200) {
        nav_menu.style.visibility = "visible";
    }
    else {
        nav_menu.style.visibility = "hidden";
        if(nav_button_active)
            triggerNavButton();
    }
});

function triggerNavButton() {
    if(nav_button_active) {
        nav_button_active = false;
    }
    else {
        nav_button_active = true;
    }

    nav_button.dispatchEvent(nav_button_event);
}