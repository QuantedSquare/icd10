const _ = require('lodash'),
    fs = require('fs');

let allCim = require('./data/all_cim10.json');



function codeToChapter(code) {
    if (code <= "B99")
        return "1"
    else if (code >= "C00" && code <= "D48")
        return "2"
    else if (code >= "D50" && code <= "D89")
        return "3"
    else if (code >= "E00" && code <= "E90")
        return "4"
    else if (code >= "F00" && code <= "F99")
        return "5"
    else if (code >= "G00" && code <= "G99")
        return "6"
    else if (code >= "H00" && code <= "H59")
        return "7"
    else if (code >= "H60" && code <= "H95")
        return "8"
    else if (code >= "I00" && code <= "I99")
        return "9"
    else if (code >= "J00" && code <= "J99")
        return "10"
    else if (code >= "K00" && code <= "K93")
        return "11"
    else if (code >= "L00" && code <= "L99")
        return "12"
    else if (code >= "M00" && code <= "M99")
        return "13"
    else if (code >= "N00" && code <= "N99")
        return "14"
    else if (code >= "O00" && code <= "O99")
        return "15"
    else if (code >= "P00" && code <= "P96")
        return "16"
    else if (code >= "Q00" && code <= "Q99")
        return "17"
    else if (code >= "R00" && code <= "R99")
        return "18"
    else if (code >= "S00" && code <= "T98")
        return "19"
    else if (code >= "V01" && code <= "Y98")
        return "20"
    else if (code >= "Z00" && code <= "Z99")
        return "21"
    else if (code >= "U00" && code <= "U99")
        return "22"
    else
        return null
}

function writeFile(filename, data) {
    fs.writeFile("data/" + filename + ".json", JSON.stringify(data), (err) => {
        if (err) throw err;

        console.log(filename, ' saved!');
    });
}

let standardCim = allCim
    .filter(e => e.code.length == 3)
    .map(e => {
        e.chapter = codeToChapter(e.code)
        return e
    })

writeFile("standard_cim10_fr", standardCim)

let detailsCim = _.groupBy(allCim
    .filter(e => e.code.length > 3), e => e.code.substring(0, 1))


for (letter in detailsCim) {
    writeFile("letter_" + letter + "_cim10_detailed_fr", detailsCim[letter])

}