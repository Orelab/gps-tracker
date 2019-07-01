
$.ajax('/lastposition').done((data)=>{
    var map = L.map('mapid').setView([data.lat, data.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([data.lat, data.lng]).addTo(map);    
});

