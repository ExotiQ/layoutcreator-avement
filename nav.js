let currentMenu = "general";

document.addEventListener("DOMContentLoaded", function(event) {
    
    // HIGHLIGHT MENU ITEMS
    
    var btnContainer = document.getElementById("icon-menu");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("icon-menu-item");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            toggleSettings(this.id);
            currentMenu = this.id;
        });
    } 



    // SHOW ONLY SELECTED MENU ITEMS
    function toggleSettings(id) {
        let settingsContainer = document.getElementById("settings");
        let settings = settingsContainer.getElementsByClassName("settings-container");
        console.log(settings)

        let current = settingsContainer.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");

        for(var i = 0; i < settings.length; i++) {
            if(settings[i].id === id) {
                settings[i].className += " active";
            }
        }
    }

});