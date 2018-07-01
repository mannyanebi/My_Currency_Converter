function getInputAmount() {
    var input_amount = document.getElementById("input-currency").value;
    // alert(typeof input_amount);
    if (isNaN(input_amount)) {
        alert("Please enter a number");
        input_amount = null;
    }
    else{
        document.getElementById("equivalent-currency").innerHTML = input_amount;
    }
}