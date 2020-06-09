let gifsIdsStorage = localStorage.getItem('gifs_id');

if (gifsIdsStorage) {
    getSaveGifByIDAndGrid('misguifos_container', 'misguifos', gifsIdsStorage)
}; 