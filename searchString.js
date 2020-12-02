//Load a book from disk
function loadBook(fileName, displayName){
    let currentBook = "";
    let url = "books/" + fileName;

    // reset our UI
    document.getElementById("fileName").innerHTML = displayName
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";

    // create a server request to load our book
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            currentBook = xhr.responseText;

            //remove line breaks and carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

            document.getElementById("fileContent").innerHTML = currentBook;

            var elmt = document.getElementById("fileContent");
            elmt.scrollTop = 0;

        }
    }
}

//get the stats for the book
function getDocStats(fileContent){

    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");

let text = fileContent.toLowerCase();
let wordArray = text.match(/\b\S+\b/g);
let wordDictionary = {};

// count every word in the wordArray
for(let word in wordArray){
    let wordValue = wordArray[word];
    if(wordDictionary[wordValue] > 0){
        wordDictionary[wordValue] + 1;
    }
    else{
        wordDictionary[wordValue] = 1;
    }
}

}

function sortProperties(obj){
    //first convert the object to an array
    let rtnArray = Object.defineProperties(obj);

    // sort the array
    rtnArray.sort(function (first, second,){
        return second[1] - first[1];
    })
}