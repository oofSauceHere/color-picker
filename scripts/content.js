const canvas = document.createElement('canvas');
const context = canvas.getContext('2d', {willReadFrequently: true});

if (chrome.runtime?.id) {
    chrome.runtime.sendMessage({query:"image"}, response => {
        console.log(response.url);
        const img = new Image();
        img.src = response.url;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
        }
    });
}

// refer to coords in screenshot
//   get color val of pixel
//   return color val
document.addEventListener('mousemove', event => {
    // need to scale X and Y
    const X = (event.clientX * canvas.width)/window.innerWidth;
    const Y = (event.clientY * canvas.height)/window.innerHeight;
    // console.log(`${X}, ${Y}`);

    const rgb = context.getImageData(X, Y, 1, 1).data;
    // console.log(`r=${rgb[0]}, g=${rgb[1]}, b=${rgb[2]}, a=${rgb[3]}`);

    // send data to popup
    if (chrome.runtime?.id) {
        chrome.runtime.sendMessage({
            query:"color",
            color:rgb
        });
    }
});

// need to:
// update on scroll
// get xy coordinate of mouse
//   display zoomed in view of space around coord (likely circle)