
$.ajax('/lastposition').done(function(){
    var map = L.map('mapid').setView([51.505, -0.09], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([51.5, -0.09]).addTo(map);    
});

