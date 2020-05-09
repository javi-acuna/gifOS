const video = document.querySelector('video');
let gifsIdsStorage = localStorage.getItem('gifs_id');
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { max: 750 },
            height: 350
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            const recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                }
            });
            document.getElementById('camera_capturar_btns').addEventListener('click', () => {
                recorder.startRecording();
            });
            document.getElementById('recording_listo_btns').addEventListener('click', () => {
                recorder.stopRecording(() => {
                    console.log('Recording Stopped');
                    let blob = recorder.getBlob();
                    let url = URL.createObjectURL(blob);
                    let preview = document.getElementById('preview_gif');
                    preview.setAttribute('style', 'background:url(' + url + ') center center; background-size: cover');
                    let uploadedGif = document.getElementById('view_uploaded_gif');
                    uploadedGif.src = url;
                    let form = new FormData();
                    form.append('file', blob, 'myGif.gif');
                    document.getElementById('subir_btn').addEventListener('click', () => {
                        fetch('https://upload.giphy.com/v1/gifs?&api_key=' + apiKey, {
                            method: 'Post',
                            body: form
                        })
                            .then(response => {return response.json()})
                            .then(dt => {
                                hiddenToggle('subiendo_container');
                                hiddenToggle('subido_container');
                                let id = dt.data.id;
                                if (gifsIdsStorage != null){
                                    let idsStorage = gifsIdsStorage + ',' + id;
                                    localStorage.setItem("gifs_id", idsStorage);
                                }else{
                                    localStorage.setItem("gifs_id", id);
                                }
                                document.getElementById('link_btn').addEventListener('click', () => {
                                    let gifUrl = 'https://giphy.com/gifs/' + id;
                                    getLink(gifUrl);
                                });
                                console.log('Success: gif uploaded to giphy');
                            })
                            .catch(error => console.error('Error:', error));
                    });
                    document.getElementById('download_btn').addEventListener('click', () => {
                        invokeSaveAsDialog(blob);
                    });
                });
            })
        });
}

function relocateToIndex() {
    location.href = 'index.html';
}
let closeBtns = document.getElementsByClassName('create_btn_close');
Array.prototype.forEach.call(closeBtns, function (closeBtn) {
    closeBtn.addEventListener('click', relocateToIndex, true);
});

[document.querySelector('#arrow'), document.getElementById('cancelar_btn'), 
    document.getElementById('cancelar_upload_btn')].forEach(element => {
        element.addEventListener('click', relocateToIndex, true);
});

document.getElementById('comenzar_btn').addEventListener('click', () => {
    hiddenToggle('crear_guifos_container');
    hiddenToggle('chequeo_container');
    getStreamAndRecord();
});

document.getElementById('camera_capturar_btns').addEventListener('click', () => {
    hiddenToggle('camera_capturar_btns');
    hiddenToggle('recording_listo_btns');
    document.getElementById('chequeo_title').textContent = 'Capturando Tu Guifo';
});

document.getElementById('recording_listo_btns').addEventListener('click', () => {
    hiddenToggle('chequeo_container');
    hiddenToggle('vista_previa_container');
});

document.getElementById('subir_btn').addEventListener('click', () => {
    hiddenToggle('vista_previa_container');
    hiddenToggle('subiendo_container');
});

document.getElementById('repetir_btn').addEventListener('click', () => {
    getStreamAndRecord();
    hiddenToggle('vista_previa_container');
    hiddenToggle('chequeo_container');
    hiddenToggle('camera_capturar_btns');
    hiddenToggle('recording_listo_btns');
    document.getElementById('chequeo_title').textContent = 'Un Chequeo Antes De Empezar';
});
document.getElementById('fin_btn').addEventListener('click', () => {
    location.href = 'misgifos.html';
});

if (gifsIdsStorage){getSaveGifByIDAndGrid('uploaded_guifos_container', 'uploaded', gifsIdsStorage)};