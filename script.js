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
        chrome.storage.local.set({"listr": listr, "header": header, "i": i}) //temporart storage for review

        }, 0)
    }
})

//Remembers the points

let permanentStorage = [];

chrome.storage.local.get(['permanentStorage'], arg => {
    if (arg.permanentStorage) {
        permanentStorage = arg.permanentStorage;
    }
})

document.getElementById("submit").onclick = function() {

    //get the value from temporary storage

    chrome.storage.local.get(['listr', 'header'], function(para) {

        //create a temporary object to push

        let tempObj = {'listr': para.listr, 'header': para.header}; 
        console.log("tempObj: " + tempObj); //CCCCCC
        permanentStorage.push(tempObj);
        
        //store the array with the permanent storage

        chrome.storage.local.set({'permanentStorage': permanentStorage});
        chrome.storage.local.get(['permanentStorage'], bla => { //CCCCCC
            console.log(bla.permanentStorage);
            
        })

        // Remove the old temporary shit

        chrome.storage.local.remove(['listr', 'header', 'i']);
        chrome.storage.local.get(['listr', 'header', 'i'], blabla => { //CCCCCC
            console.log(blabla.listr);
        })


    });
}