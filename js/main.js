$(document).ready(function(){

    let textarea = document.querySelector("#text");

    textarea.addEventListener("keyup", function(){
        start(textarea);
    });

    start(textarea);
});


function start(textarea){
    let phrase = textarea.value;

    let [words, text_cleaned, array] = clean_phrase(phrase);
    let map = create_map(words);
    
    let word = document.querySelector("#word");
    let btn = document.getElementById("btn");

    word.addEventListener("keyup", function(){
        search(word, array, map, text_cleaned);
    });
    search(word, array, map, text_cleaned);
};


function search(word, array, map, text_cleaned){

    let value = word.value.toLowerCase().replace(/[!¡()¿?_'.,-]/gi, '');
    let result = document.getElementById("value");
    let text = "";

    if (text_cleaned.includes(value) && value != ""){
        text = show(value, array, map);
    }else{
        text = "<li>No se ha encontrado...</li>";
    }
    result.innerHTML = text;
}


function show(value, array, map){
    let texthtml = "";
    for(let w of array){
        let text = w;
        if(text.includes(value) != false && text[0] == value[0]){
            texthtml += "<li> La palabra [ "+text+" ] se repite veces "+map[text]+"</li>";
        }
    }
    return texthtml;
}


function clean_phrase(phrase){
    let text_cleaned = phrase.toLowerCase().replace(/[!¡()¿?_'.,-]/gi, '');
    let words = text_cleaned.split(" ");

    let array = [];
    for(let w of words){
        if(array.includes(w) == false){
            array.push(w);
        }
    }
    text_cleaned = array.join("");

    return [words, text_cleaned, array];
}


function create_map(words){
    let map = {};
    for(let w of words){
        if (map[w]){
            map[w]++;
        }else{
            map[w] = 1;
        }
    }
    return map;
}

