// Get the root element to have access to variables
const root = document.querySelector(":root");

// Get all the sections of the DOM
const main_element = document.querySelector("main");
const main_section = document.getElementById("anthony_section");
const about_section = document.getElementById("about_section");
const nav_links = document.querySelectorAll("#nav_menu > a");
const project_tabs = document.querySelectorAll(".project_tab");
const projects_section = document.querySelectorAll("#projects_section");
const work_container = document.getElementById("work_container");

const sections = document.querySelectorAll("main > section");

//An array of descriptions for the projects
const descriptions = [];

// Fill the array with the descriptions
descriptions.push(new Description("This Website", "Figma, Git, Visual Studio Code", "Designed in Figma and implemented using plain HTML, CSS, and Javascript.", "html, css, javascript", "https://github.com/lansinganthony85/portfolio_website"));
descriptions.push(new Description("KiRB-E Vehicle Module", "CodeWarrior, Dragon12, Arduino", "KiRB-E is a remote-controlled robot that can be used to explore areas that are inaccessible or harmful to humans. The robot is piloted by the user with an RF remote control, and will periodically record environmental data (ambient temperature and light level) to an FRAM memory chip along with the current timestamp. Three ultrasonic distance sensors prevent the user from accidentally driving into an obstacle by halting the robot. The ultrasonic sensors are monitored by a separate Arduino microcontroller, and any near collisions are also recorded to the FRAM. Once the robot has returned from its mission, “explore mode” can be turned off and the robot will send all the recorded data to a separate system via a serial connection. Full manual can be read on the Github.", "c, assembly", "https://github.com/lansinganthony85/dragon12-vehicle-module"));

// Get button for navigation
const nav_button = document.getElementById("nav_button");
const nav_button_event = new Event("menutrigger");
var nav_button_active = false;

project_tabs.forEach(function (element, index) {
    element.addEventListener("click", () => {
        clearProjectSelection();
        element.classList.add("active");
        element.childNodes[3].classList.add("active");
        removeCurrentDescription();
        displayDescription(element.offsetTop, index);
    });
});

function removeCurrentDescription() {
    const element = document.querySelector(".project_desc");
    if(element !== null)
        element.remove();
}

function displayDescription(topPos, index) {
    const description = document.createElement('div');
    description.setAttribute("class", "project_tab project_desc");

    for(let i = index; i < project_tabs.length; i++) {
        if((i + 1 >= project_tabs.length) || project_tabs[i + 1].offsetTop != topPos) {
            project_tabs[i].after(descriptions[index].getDescription());
            break;
        }
    }
}

function clearProjectSelection() {
    project_tabs.forEach(function (element) {
        element.classList.remove("active");
        element.childNodes[3].classList.remove("active");
    });
}

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

    clearProjectSelection();
    removeCurrentDescription();
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

// Dictionary to hold skill images
let allSkills = {};
allSkills["c"] = getImageElement("icons/c.png", "C Language");
allSkills["c"].setAttribute("class", "icon_desc");
allSkills["assembly"] = getImageElement("icons/assembly.png", "Assembly Language");
allSkills["assembly"].setAttribute("class", "icon_desc");
allSkills["html"] = getImageElement("icons/html.png", "HTML");
allSkills["html"].setAttribute("class", "icon_desc");
allSkills["css"] = getImageElement("icons/css.png", "CSS");
allSkills["css"].setAttribute("class", "icon_desc");
allSkills["javascript"] = getImageElement("icons/javascript.png", "Javascript");
allSkills["javascript"].setAttribute("class", "icon_desc");


// The Description object
function Description(title, tools, description, languages, github) {
    this.title = title;
    this.tools = tools.split(", ");
    this.description = description;
    this.languages = languages.split(", ");
    this.github = github;

    this.getDescription = function() {
        const article = document.createElement('article');
        article.setAttribute("class", "project_tab project_desc");

        const details = document.createElement('section');
        details.setAttribute("class", "project_details");

        details.appendChild(getElement("h2", this.title));
        details.appendChild(getToolList(this.tools));

        const footer = document.createElement("section");
        footer.setAttribute("class", "article_bottom");

        const skills = document.createElement("section");
        skills.setAttribute("class", "skills");

        footer.appendChild(getSkills(skills, this.languages));
        footer.appendChild(getGithub(this.github));

        article.appendChild(details);
        article.appendChild(getElement("p", this.description));
        article.appendChild(footer);

        return article;
    }
}

function getElement(el, content) {
    const element = document.createElement(el);
    element.textContent = content;

    return element;
}

function getToolList(tools) {
    const list = document.createElement("dl");
    list.appendChild(getElement("dt", "Tools Used:"));

    tools.forEach((element) => list.appendChild(getElement("dd", element)));

    return list;
}

function getSkills(skillsNode, tools) {
    tools.forEach(element => {
        skillsNode.appendChild(allSkills[element]);
    });

    return skillsNode;
}

function getImageElement(src, alt) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;

    return image;
}

function getGithub(link) {
    const img_link = document.createElement("a");
    img_link.href = link;
    img_link.setAttribute("class", "icon_desc github_icon");
    img_link.alt = "Link to Project";

    return img_link;
}

window.onscroll = function() {
    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if(scrollY >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    nav_links.forEach((link) => {
        link.classList.remove("active");
        if(link.classList.contains(current)) {
            link.classList.add("active");
        }
    })
}

nav_links.forEach((link) => {
    link.addEventListener("click", () => {
        nav_links.forEach((li) => {
            li.classList.remove("active");
        })

        link.classList.add("active");
    });
});