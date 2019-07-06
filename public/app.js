
$.ajax('/lastposition').done((data) => {
    var map = L.map('mapid').setView([data.lat, data.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([data.lat, data.lng]).addTo(map);    
});



$('#gmap-url').on('click', () => {
    sendMessage('URL,666666#');
});


$('#gmap-position').on('click', () => {
    sendMessage('WHERE,666666#');
});


function sendMessage( msg ){
    let message = encodeURIComponent(msg);
    let server = $('#sms-server').val();

    console.log(server+message);
    $.ajax({
        url: server+message,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });
}