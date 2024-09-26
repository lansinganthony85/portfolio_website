// Get the root element to have access to --grid-columns variable
const root = document.querySelector(":root");

/*
 *  Globals
 */

// Whenver the window size is changed we reset the status of the webpage to avoid
// weird formatting. We also change the visibility of the navigation menu to avoid cluttering.
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

    school_entries.forEach((element) => {
        element.querySelector(".degree_details").style.display = "none";
    });
});

/*
 *  @name
 *      getImageElement
 *  @description
 *      This method takes a file source and alt text and returns an image element.
 *  @arguments
 *      src: the file source of the image
 *      alt: the alt text of the image
 *  @return
 *      image: the image element
 */
function getImageElement(src, alt) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;

    return image;
}

/*
 *  @name
 *      getElement
 *  @description
 *      A simple method that takes the element type and text content and returns the appropriate element
 *      filled with that content.
 *  @arguments
 *      el: this is the element (such as "div")
 *      content: the text to be inserted into the element
 *  @return
 *      element: the element filled with text
 */
function getElement(el, content) {
    const element = document.createElement(el);
    element.textContent = content;

    return element;
}

/*
    The following code is for displaying project descriptions for when a project tab is selected.
*/

/*
 *  DESCRIPTION CLASS
 *      This class takes in and stores information on a project and returns that information as an article
 *      element.
 *  @args
 *      title: the name of the project
 *      tools: the software/hardware used to accomplish the project
 *      description: a description of what the project is
 *      languages: programming languages used
 *      github: the link to the project's github
 *  @return
 *      article: the element containing all the elements required to display
 *          the information in html/css
 */
function Description(title, tools, description, languages, github) {
    this.title = title;
    this.tools = tools.split(", ");
    this.description = description;
    this.languages = languages.split(", ");
    this.github = github;

    // Dictionary to hold skill images
    this.allSkills = {};
    this.allSkills["c"] = getImageElement("icons/c.png", "C Language");
    this.allSkills["c"].setAttribute("class", "icon_desc");
    this.allSkills["assembly"] = getImageElement("icons/assembly.png", "Assembly Language");
    this.allSkills["assembly"].setAttribute("class", "icon_desc");
    this.allSkills["html"] = getImageElement("icons/html.png", "HTML");
    this.allSkills["html"].setAttribute("class", "icon_desc");
    this.allSkills["css"] = getImageElement("icons/css.png", "CSS");
    this.allSkills["css"].setAttribute("class", "icon_desc");
    this.allSkills["javascript"] = getImageElement("icons/javascript.png", "Javascript");
    this.allSkills["javascript"].setAttribute("class", "icon_desc");

    // The only public method to return this object as an article element
    this.getDescription = function() {
        const article = document.createElement('article');
        article.setAttribute("class", "project_tab project_desc");

        const details = document.createElement('section');
        details.setAttribute("class", "project_details");

        details.appendChild(getElement("h2", this.title));
        details.appendChild(this.getToolList(this.tools));

        const footer = document.createElement("section");
        footer.setAttribute("class", "article_bottom");

        const skills = document.createElement("section");
        skills.setAttribute("class", "skills");

        footer.appendChild(this.getSkills(skills));
        footer.appendChild(this.getGithub());

        article.appendChild(details);
        article.appendChild(getElement("p", this.description));
        article.appendChild(footer);

        return article;
    }
    
    /*
     *  @name
     *      getToolList
     *  @description
     *      This method puts the elements of an array into a dl element (as dd elements) and returns.
     *  @prerequisites
     *      This method assumes that the array is of software/hardware used for the completion of a project.
     *  @arguments
     *      tools: the array of software/hardware used for the completion of a project.
     *  @return
     *      list: the dl element
     */
    this.getToolList = function(tools) {
        const list = document.createElement("dl");
        list.appendChild(getElement("dt", "Tools Used:"));
    
        tools.forEach((element) => list.appendChild(getElement("dd", element)));
    
        return list;
    }
    
    /*
     *  @name
     *      getSkills
     *  @description
     *      Take a section element and return it filled with the icons that represent programming languages.
     *  @arguments
     *      skillsNode: the section element to be filled
     *  @return
     *      skillsNode: the section element that has been filled 
     */
    this.getSkills = function(skillsNode) {
        this.languages.forEach(element => {
            skillsNode.appendChild(this.allSkills[element]);
        });
    
        return skillsNode;
    }
    
    /*
     *  @name
     *      getGitHub
     *  @description
     *      This method takes a website link and returns an image link to that website. This image used is the Github
     *      logo.
     *  @prerequisites
     *      This method assumes the website link provided is to a github page.
     *  @arguments
     *      link: the link to the Github page
     *  @return
     *      img_link: an anchor element that is the github logo and is linked to the Github page
     */
    this.getGithub = function () {
        const img_link = document.createElement("a");
        img_link.href = this.link;
        img_link.setAttribute("class", "icon_desc github_icon");
        img_link.alt = "Link to Project";
    
        return img_link;
    }
}

//An array of descriptions for the projects
const descriptions = [];

// Fill the array with the descriptions. These should be in the same order as the project tabs.
descriptions.push(new Description(
                                    "This Website", "Figma, Git, Visual Studio Code",
                                    "Designed in Figma and implemented using plain HTML, CSS, and Javascript.", 
                                    "html, css, javascript", 
                                    "https://github.com/lansinganthony85/portfolio_website"
                                ));
descriptions.push(new Description(
                                    "KiRB-E Vehicle Module", "CodeWarrior, Dragon12, Arduino", 
                                    "KiRB-E is a remote-controlled robot that can be used to explore areas that are inaccessible \
                                    or harmful to humans. The robot is piloted by the user with an RF remote control, and will \
                                    periodically record environmental data (ambient temperature and light level) to an FRAM memory \
                                    chip along with the current timestamp. Three ultrasonic distance sensors prevent the user from \
                                    accidentally driving into an obstacle by halting the robot. The ultrasonic sensors are monitored \
                                    by a separate Arduino microcontroller, and any near collisions are also recorded to the FRAM. Once \
                                    the robot has returned from its mission, “explore mode” can be turned off and the robot will send \
                                    all the recorded data to a separate system via a serial connection. Full manual can be read on the \
                                    Github.", 
                                    "c, assembly", 
                                    "https://github.com/lansinganthony85/dragon12-vehicle-module"
                                ));


/*
 * The following code is for the functionality of the tabs on the project page.
 */
const projects_grid = document.getElementById("projects_grid");
const project_tabs = document.querySelectorAll(".project_tab");

/*
 *  @name
 *      removeCurrentDescription
 *  @description
 *      Remove any descriptions that are being displayed in the project section.
 *  @arguments
 *      none
 *  @return
 *      none
 */
function removeCurrentDescription() {
    //There will only ever be one being displayed so just grab it.
    const element = document.querySelector(".project_desc");
    if(element !== null)
        element.remove();
}

/*
 *  @name
 *      displayDescription
 *  @description
 *      Display a description of a project on the next row that takes up the whole row.
 *  @arguments
 *      topPos: this is the y position of the top of a selected project tab
 *      index: the index of project tab that was selected
 *  @return
 *      none
 */
function displayDescription(topPos, index) {
    const description = document.createElement('div');

    // update --grid-columns so that the description takes of a whole row
    root.style.setProperty("--grid_columns", getGridColumns() + 1)

    description.setAttribute("class", "project_tab project_desc");

    // Find the right position in the grid to place the description. We do this by comparing
    // the top position of each tab. Once the top position changes we know we are at a new
    // row and can place the description there.
    for(let i = index; i < project_tabs.length; i++) {
        if((i + 1 >= project_tabs.length) || project_tabs[i + 1].offsetTop != topPos) {
            project_tabs[i].after(descriptions[index].getDescription());
            break;
        }
    }
}

/*
 *  @name
 *      getGridColumns
 *  @description
 *      This method takes the current grid values and uses that to updated the grid-column-end number.
 *  @arguments
 *      none
 *  @return
 *      grid_end: the grid-column-end
 */
function getGridColumns() {
    // Grab the width of all the columns in a grid
    const gridValues = window.getComputedStyle(projects_grid).gridTemplateColumns.split(' ');
    let grid_end = 0;

    // Sometimes the grid can have a random 0px value. This should be ignored.
    gridValues.forEach(element => {
        if(element !== '0px')
            grid_end++;
    });
    return grid_end;
}

/*
 *  @name
 *      clearProjectSelection
 *  @description
 *      This method goes through all the project tabs and removes the active class.
 *  @arguments
 *      none
 *  @return
 *      none
 */
function clearProjectSelection() {
    project_tabs.forEach(function (element) {
        element.classList.remove("active");
        element.childNodes[3].classList.remove("active");  // remove active class from caption
    });
}

// Go through each tab on the project section and provide the following functionality:
//      - clear the current selection (if any)
//      - add the "active" class to the tab that was selected and to the caption
//      - remove the current description (if any)
//      - display the description of the selected element
project_tabs.forEach(function (element, index) {
    element.addEventListener("click", () => {
        clearProjectSelection();
        element.classList.add("active");
        element.childNodes[3].classList.add("active"); //the caption is the 4th in the current element's list
        removeCurrentDescription();
        displayDescription(element.offsetTop, index);
    });
});


/*
 *  The following code is for the navigation buttons for the internal links, both the menu behavior
 *  and the link behaviors.
 */
const nav_button = document.getElementById("nav_button");
const nav_links = document.querySelectorAll("#nav_menu > a");

// Create a new Event type for when the nav_button is selected.
const nav_button_event = new Event("menutrigger");
var nav_button_active = false;

// Whenver the nav_button icon is selected, show that navigation menu.
// This only kicks in once the nav_button is visible.
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

/*
 *  @name
 *      triggerNavButton
 *  @description
 *      The method updates the active status of the nav_button and triggers the menutrigger event.
 *  @arguments
 *      none
 *  @return
 *      none
 */
function triggerNavButton() {
    if(nav_button_active) {
        nav_button_active = false;
    }
    else {
        nav_button_active = true;
    }

    nav_button.dispatchEvent(nav_button_event);
}

// Whenver scrolling occurs, check location on the webpage. If a certin section is taking
// up the page, add the active class to the link in the menu.
const sections = document.querySelectorAll("main > section");

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

// Whenever a link in the navigation is clicked, change the active status. This is different from scrolling
// as clicking on the link takes you to the section and is not a scrolling event.
nav_links.forEach((link) => {
    link.addEventListener("click", () => {
        
        nav_links.forEach((li) => {
            li.classList.remove("active");
        })
        
        link.classList.add("active");
    });
});

// Here we go through each school entry and provide the following behavior:
//      - turn the '+' icon into a button
//      - check its display status (could be 'none' or '' which is the case when first loading the page)
//          if true display as flex or grid depending on the screen size
//          otherwise the school details should not be displayed.
const school_entries = document.querySelectorAll(".school_entry");

school_entries.forEach((element) => {
    const button = element.querySelector(".degree .degree_button");
    button.addEventListener("click", () => {
        const content = element.querySelector(".degree_details");

        if(content.style.display === "none" || content.style.display === "") {
            content.style.display = (window.innerWidth <= 800) ? "flex" : "grid";
            element.style.border = "solid 3px #222222";
        }
        else {
            content.style.display = "none";
            element.style.border = "none";
        }
    });
});