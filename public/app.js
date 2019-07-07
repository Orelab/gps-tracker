let points;
let marker;
let map;


$.ajax('/lasthundred').done((data) => {
    points = data;

    let lastItem = data[data.length-1];

    map = L.map('mapid').setView([lastItem.lat, lastItem.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    setMarker(lastItem);

    $('#timeline').attr('max', data.length-1).val(data.length-1);
});



$('#gmap-url').on('click', () => {
    sendMessage('URL');
});


$('#gmap-position').on('click', () => {
    sendMessage('WHERE');
});

$('#timeline').on('change', function(){
    let id = $(this).val();
    setMarker( points[id] );
});

const setMarker = data => {
    if( ! marker ){
        marker = L.marker([data.lat, data.lng]).addTo(map);
        marker.bindPopup("").openPopup();
    } else {
        marker.setLatLng(new L.LatLng(data.lat, data.lng)); 
    }

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

    marker._popup.setContent("<b>Last recording :</b><br>"+time);
}



function sendMessage( msg ){
    $.ajax({
        url:'/order',
        data: {msg:msg}
    });
}