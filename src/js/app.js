if('serviceWorker' in navigator){

    navigator.serviceWorker
        .register('./service-worker.js', {scope: './'})
        .then(function (registration) {
            console.log("Service Worker Registered");
        })
        .catch(function (err) {
            console.log("Service Worker Failed to Register", err);
        })
}

var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
    var apiKey = '';
    //free version api doesnt require api key

    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    var query = fromCurrency + '_' + toCurrency;

    var url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
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

function getCurrencies(){

    fetch ('https://free.currencyconverterapi.com/api/v5/currencies')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
        })
}