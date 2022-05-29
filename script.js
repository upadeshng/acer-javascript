function handleChangeInputScenario1(inputValue) {
    var data = document.getElementsByClassName("sc1-data");
    var dataX = document.getElementsByClassName("sc1-data-x");
    var data1 = [];
    var data2 = [];
    var dataOutput = [];

    // show validation message if failed input value
    var validation = validateScenario1(inputValue);
    if(validation === false) {
        document.getElementById("sc1-output").innerHTML = '<div class="error">Invalid: Value must be in {1, 2, 3}</div>';
        return;
    }

    // generate data1 array
    for (var i = 0; i < data.length; i++) {
        var value = data[i].innerHTML;
        data1.push(value);
    }

    // generate data2 array, replacing with input value
    for (var i = 0; i < dataX.length; i++) {
        data2.push(inputValue);
    }

    // generate output array with string concatenated
    for (var i = 0; i < data.length; i++) {
        var value = data1[i] + ',' + data2[i];
        dataOutput.push(value)
    }

    var output = outputStringFormatScenario1(dataOutput);

    console.log(data1);
    console.log(data2);
    console.log(dataOutput);
    console.log(output);
    document.getElementById("sc1-output").innerHTML = inputValue
        ? '<div class="success"><b>Output:</b> ' + output + '</div>'
        : '';
}

function handleChangeInputScenario2() {
    var valueA = document.getElementById("sc2-input-a").value;
    var valueB = document.getElementById("sc2-input-b").value;
    var valueC = document.getElementById("sc2-input-c").value;
    var valueD = document.getElementById("sc2-input-d").value;

    // show validation message if failed input value
    var validation = validateScenario2(valueA, valueB, valueC, valueD);
    if(validation === false) {
        document.getElementById("sc2-output").innerHTML = '<div class="error">Invalid: Value A and B should be in {1, 2, 3} and C and D should be in {3, 4} AND Value C must not equal to Value D </div>';
        return;
    }

    var col1DataA = getColDataScenario2(valueA, 'A', 'sc2-data');
    var col2DataB = getColDataScenario2(valueB, 'B', 'sc2-data-x');
    var col3DataC = getColDataScenario2(valueC, 'C', 'sc2-data-y');
    var col4DataD = getColDataScenario2(valueD, 'D', 'sc2-data-y', col3DataC);
    var dataOutput = [];

    // generate output array with string concatenated
    for (var i = 0; i < col1DataA.length; i++) {
        var value = col1DataA[i] + ',' + col2DataB[i] + ',' + col4DataD[i];
        dataOutput.push(value)
    }

    console.log(col1DataA);
    console.log(col2DataB);
    console.log(col3DataC);
    console.log(col4DataD);
    console.log(dataOutput);

    var output = outputStringFormatScenario1(dataOutput);

    document.getElementById("sc2-output").innerHTML ='<div class="success"><b>Output:</b> ' + output + '</div>';

}

function getColDataScenario2(inputValue, checkStr, searchClass, baseData) {
    var data = baseData ? baseData : document.getElementsByClassName(searchClass);

    var result = [];

    for (var i = 0; i < data.length; i++) {
        var value = baseData ? baseData[i] : data[i].innerHTML;
        if (value === checkStr) {
            result.push(inputValue);
        } else {
            result.push(value);
        }
    }

    return result;
}

function validateScenario1(value) {
    if( value < 1 || value > 3 || isNaN(value)) {
        return false;
    }
}

function validateScenario2(valueA, valueB, valueC, valueD) {
    if( valueA < 1 || valueA > 3 || isNaN(valueA)) {
        return false;
    }
    if( valueB < 1 || valueB > 3 || isNaN(valueB)) {
        return false;
    }
    if( valueC < 3 || valueC > 4 || isNaN(valueC)) {
        return false;
    }
    if( valueD < 3 || valueD > 4 || isNaN(valueD)) {
        return false;
    }
    if( valueC === valueD) {
        return false;
    }
}

function outputStringFormatScenario1(data) {
    var string = JSON.stringify(data);

    // replace global `"` with `'`
    var output = string.replace(/"/g, "'");

    // replace global `[` with `"`
    output = output.replace('[', '"');

    // replace global `]` with `"`
    output = output.replace(']', '"');

    return output;
}