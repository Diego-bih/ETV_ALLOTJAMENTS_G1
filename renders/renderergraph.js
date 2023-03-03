const { contextBridge, ipcRenderer } = require('electron');
const { BrowserWindow } = require('@electron/remote');

const ctx = document.getElementById('firstChart');
const ctx2 = document.getElementById('secondChart');
const ctx3 = document.getElementById('thirdChart');
const ctx4 = document.getElementById('forthChart');


ipcRenderer.send('ch1', true);

const tpus_a = [];



//In this chart we get the response of the API and we parse it to feed it to the chart.
let firstChart;
ipcRenderer.on('ch2', async (event, resposta) => {

    var data = resposta.data

    //With this try catch we make sure that if we didnt get the data we do the petition again
    try {

        data = await JSON.parse(resposta).data
    }
    catch {
        await ipcRenderer.send('ch1', true);
    }

    var lbl = [];
    var ldata = [];
    var s = [0, 0, 0, 0, 0];

    //Here we preare the data to feed it to the chart.
    for (var valor of data) {
        var valora = valor["valoracio"];
        switch (valora) {
            case 1:
                s[0]++;
                break;
            case 2:
                s[1]++;
                break;
            case 3:
                s[2]++;
                break;
            case 4:
                s[3]++;
                break;
            case 5:
                s[4]++;
                break;
            default:
                break;
        }
    }
    lbl.push('1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars');
    ldata.push(s[0], s[1], s[2], s[3], s[4],);


    if (firstChart) {
        firstChart.destroy();
    }

    console.log(lbl)

    firstChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lbl,
            datasets: [{
                label: 'Quantitat',
                data: ldata,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: { text: 'Valoracions', display: true },
            },
        }
    });



});

ipcRenderer.send('ch3', true);

let secondChart;
let thirdChart;
let forthChart;
ipcRenderer.on('ch4', async (event, resposta) => {
    var data;

    try {

        data = await JSON.parse(resposta).data
    }
    catch {
        await ipcRenderer.send('ch3', true);
    }

    //Here we preare the data to feed it to the chart.
    var lbl = [];
    var s = [];
    const set = new Set(s);

    for (var valor of data) {
        set.add(valor['nhabitacions']);
        s.push(valor['nhabitacions']);
    }

    //We make sure that we get each element with no duplicates for the labels of the chart using set
    var objList = countSame(s);
    let i = set.keys();
    for (var v of i) {
        lbl.push(v += ' Habitacions');
    }

    var sortedData = objList;
    var sortedLbl = lbl.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));


    if (secondChart) {
        secondChart.destroy();
    }
    secondChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: sortedLbl,
            datasets: [{
                label: 'Nombre d\'allotjaments',
                borderWidth: 1,
                data: sortedData,
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: { text: 'Nombre d\'Habitacions:', display: true },
            },
        }
    });


    var lbl2 = [];
    var s2 = [];
    const set2 = new Set(s2);

    for (var valor of data) {
        set2.add(valor['propietari_id']);
        s2.push(valor['propietari_id']);
    }

    //Here we preare the data to feed it to the chart.
    var objList2 = countSame(s2);
    let i2 = set2.keys();
    for (var v of i2) {
        lbl2.push('Propietari amb l\'id ' + v);
        console.log(v)
    }


    if (thirdChart) {
        thirdChart.destroy();
    }
    thirdChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: lbl2,
            datasets: [{
                label: 'Allotjaments',
                data: objList2,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: { text: 'Nombre d\'allotjaments per usuari:', display: true },
            },
        }
    });

    var lbl3 = [];
    var s3 = [];
    const set3 = new Set(s3);

    //Here we preare the data to feed it to the chart.
    for (var valor of data) {
        set3.add(valor['npersones']);
        s3.push(valor['npersones']);
    }

    var objList3 = countSame(s3);
    let i3 = set3.keys();
    for (var v of i3) {
        lbl3.push(v + ' persones');
        console.log(v)
    }

    if (forthChart) {
        forthChart.destroy();
    }

    var sortedData3 = objList3;
    var sortedLbl3 = lbl3.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));



    forthChart = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: sortedLbl3,
            datasets: [{
                label: 'Nombre d\'allotjaments',
                data: sortedData3,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: { text: 'Nombre de persones per allotjament:', display: true },
            },
        }
    });

});

//contar nombre de x numero hi ha dins l'array
function countSame(s) {
    var counts = {};
    for (const num of s) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log('JSON: ');
    console.log(counts);
    return Object.values(counts);

}