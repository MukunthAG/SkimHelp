//if stored values are ready, display those values after since the user closes the extension and reopens it.

chrome.storage.local.get(['listr', 'header'], function(ref) { 
    if (ref.listr) {
        $("#allData").append(ref.header);
        $("#allData").append(`<ol id="items">${ref.listr}</ol>`);
    }
})

//Title and url constructor

let header = " "; 
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    header = `<h4>Title: ${tabs[0].title}</h4><h4>Url: ${tabs[0].url}</h4>`
})

//Some Important global variables

let point = document.getElementById("point"); let i = 0; let listr = " ";

//Fires on pressing Enter

document.getElementById("point").addEventListener("keypress", function(info) {
    
    //checks if Enter button is pressed

    if (info.key === "Enter") {

        //gets the value of listr(list items as a string) and the header display variable "i"

        chrome.storage.local.get(['listr', 'i'], function(temp) {
            if (temp.listr) {listr = temp.listr;} if (temp.i) {i = temp.i;} 
        })

        //setTimeout makes the following code inside the functions asynchronous, waits till the above callback finish recieving data

        setTimeout(function() {

        if (i === 0) { // displays the header only once
            $("#allData").append(header); i++;
        }

        //appends(displays) the info directly from the input

        $("#allData").append(`<ol id="items"></ol>`);
        $("#items").append(`<li>${point.value}</li>`);

        //Store the points as a string

        listr += `<li>${point.value}</li>`
        document.getElementById("point").value = ""; //clears the input field for next input
        chrome.storage.local.set({"listr": listr, "header": header, "i": i}) //store some important variables

        }, 0)
    }
})

//Remembers the points

document.getElementById("submit").onclick = function() {
    
}