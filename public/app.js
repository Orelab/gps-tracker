
$.ajax('/lastposition').done((data) => {
    var map = L.map('mapid').setView([data.lat, data.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([data.lat, data.lng]).addTo(map);

    var opt = {
        weekday:'long', 
        year:'numeric', 
        month:'long', 
        day:'numeric', 
        hour12: false, 
        hour: '2-digit', 
        minute:'2-digit' 
    };
    var time = ( new Date(data.date) ).toLocaleTimeString('fr-FR', opt);

    marker.bindPopup("<b>Last recording :</b><br>"+time).openPopup();
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