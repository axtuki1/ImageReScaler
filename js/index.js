

const imageGen = (image, bgImage) => {
    const canvas = document.createElement("canvas");
    canvas.width = document.getElementById("widthSize").value;
    canvas.height = document.getElementById("heightSize").value;
    const context = canvas.getContext("2d");
    // 背景色描画
    context.fillStyle = document.getElementById("color").value;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const canvasAspect = canvas.width / canvas.height;
    // 背景画像描画
    if (bgImage != null) {
        const imageAspect = bgImage.width / bgImage.height;
        let x = 0, y = 0, w = canvas.width, h = canvas.height;
        if (canvasAspect > imageAspect) {
            h = bgImage.height * (canvas.width / bgImage.width);
            y = (canvas.height - h) / 2;
        } else {
            w = bgImage.width * (canvas.height / bgImage.height);
            x = (canvas.width - w) / 2;
        }
        let blur = document.getElementById("blur").value;
        if(Number.isNaN(blur)) blur = 0;
        context.filter = 'blur('+blur+'px)';
        context.drawImage(bgImage, x, y, w, h);
        context.filter = 'none';
    }

    // 画像描画
    if (image != null) {
        const aspect = image.width / image.height;
        let x = 0, y = 0, w = canvas.width, h = canvas.height;
        if (canvasAspect < aspect) {
            // キャンバスのほうが横長
            h = image.height * (canvas.width / image.width);
            y = (canvas.height - h) / 2;
        } else {
            w = image.width * (canvas.height / image.height);
            x = (canvas.width - w) / 2;
        }
        context.drawImage(image, x, y, w, h);
    }

    let url = canvas.toDataURL("image/png");
    document.getElementById("preview").src = url;

}

const gen = () => {
    const file = document.getElementById("inputFile").files[0];
    
    const bgFile = document.getElementById("inputBGFile").files[0];
    let bgImage = null;
    let bgImageEnable = false, standby = false, bgStandby = false;
    if (bgFile != null) {
        if (bgFile.type.indexOf("image/") != -1) {
            bgImageEnable = true;
            const maskUrl = URL.createObjectURL(bgFile);
            bgImage = new Image();
            bgImage.onload = () => {
                bgStandby = true;
            }
            bgImage.src = maskUrl;
        } else {
            return;
        }
    }

    if (file == null || file.type.indexOf("image/") === -1) {
        let id = setInterval(() => {
            if (!bgImageEnable || bgImageEnable && bgStandby) {
                imageGen(null, bgImage);
                clearInterval(id);
            }
        }, 0);
        return;
    }
    const url = URL.createObjectURL(file);

    const image = new Image();
    image.onload = () => {
        standby = true;
    }
    image.src = url;

    let id = setInterval(() => {
        if (standby) {
            if (!bgImageEnable || bgImageEnable && bgStandby) {
                imageGen(image, bgImage);
                clearInterval(id);
            }
        }
    }, 0);

}


const downloadImage = (imageUrl, n = "") => {
    let name = document.querySelector("#name").value.replace(/\.png/g, '');
    let link = document.createElement("a");
    link.href = imageUrl;
    link.download = name + n + ".png";
    link.click();
}

document.getElementById("inputFile").addEventListener("input", (e) => {
    gen();
});

document.getElementById("inputBGFile").addEventListener("input", (e) => {
    gen();
});

const preset = (elm) => {
    const preset = elm.innerHTML.split("x");
    document.getElementById("widthSize").value = preset[0];
    document.getElementById("heightSize").value = preset[1];
}

const delFile = (elm) => {
    elm.parentElement.querySelector("input").value = "";
    gen();
}

const download = () => {
    const url = document.getElementById("preview").src;
    if(url == "") return;
    downloadImage(url);
}