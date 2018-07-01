// function getCurrencies(){
//
//     fetch ('https://free.currencyconverterapi.com/api/v5/currencies')
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })
//         .catch(function (err) {
//             console.log('Network Issue ', err);
//         })
// }

// function getCurrencies(){
//     var currency_list = document.querySelector('#list-of-currencies');
//     fetch ('js/currencies.json')
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (data) {
//             for (var i = 0; i < data.currencies.length; i++) {
//                 var currency_details = "";
//                 // var currency_details = document.createElement('option');
//                     // <li>${data.currencies[i].id}</li>
//                     // <li>${data.currencies[i].currencyName}</li>
//                 var currency_details =+ "Currency ID" + data.currencies[i].id + "Currency Name" + data.currencies[i].currencyName;
//                 // currency_list.appendChild(currency_details);
//             }
//             document.getElementById("list-of-currencies").innerHTML = "<select><option>"+currency_details+"</option></select> ";
//         })
// }


function prepareConvertCurrency() {
    var amount = document.getElementById("amount").innerHTML;

    var inputCurrency = document.getElementById("input-currencies-list");
    var fromCurrency = inputCurrency.options[inputCurrency.selectedIndex].value;

    var exchangeCurrency = document.getElementById("input-currencies-list");
    var toCurrency = exchangeCurrency.options[exchangeCurrency.selectedIndex].value;
    var cb = "";
    convertCurrency(amount, fromCurrency, toCurrency, cb);
}



function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    var https = require('https');
    var apiKey = '';
    //free version api doesnt require api key

    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    var query = fromCurrency + '_' + toCurrency;

    var url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
        + query + '&compact=ultra&apiKey=' + apiKey;

    https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            try {
                var jsonObj = JSON.parse(body);

                var val = jsonObj[query];
                if (val) {
                    var total = val * amount;
                    cb(null, Math.round(total * 100) / 100);
                    console.log(cb);
                } else {
                    var err = new Error("Value not found for " + query);
                    console.log(err);
                    cb(err);
                }
            } catch(e) {
                console.log("Parse error: ", e);
                cb(e);
            }
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
    });
}