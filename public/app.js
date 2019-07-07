let points;
let marker;

$.ajax('/lasthundred').done((data) => {
    points = data;

    let lastItem = data[data.length-1];

    setMarker( lastItem );

    //-- update timeline

    $('#timeline').attr('max', data.length-1);
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
    var map = L.map('mapid').setView([data.lat, data.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    marker = L.marker([data.lat, data.lng]).addTo(map);

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

}



function sendMessage( msg ){
    $.ajax({
        url:'/order',
        data: {msg:msg}
    });
}