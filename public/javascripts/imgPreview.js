var previewIndex = 0;
showImg(previewIndex);

function currentImg(n) {
    previewIndex = n;
    showImg(previewIndex);
}

function showImg(n) {
    let i;
    let imagesMini = document.getElementsByClassName('img-mini');
    let imagesFullsize = document.getElementsByClassName('img-fullsize');

    for (i = 0; i < imagesMini.length; i++) {
        imagesMini[i].className = imagesMini[i].className.replace(' active', '');
    }
    for (i = 0; i < imagesFullsize.length; i++) {
        imagesFullsize[i].style.display = 'none';
    }

    imagesMini[n].className += ' active';
    imagesFullsize[n].style.display = 'block';
}