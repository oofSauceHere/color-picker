// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const rgbToHex = (r, g, b) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const colorDiv = document.getElementById("color");
    if(message.query == "color") {
        const {0:red, 1:green, 2:blue, 3:alpha} = message.color;
        console.log(message.color);

        const hex = rgbToHex(red, green, blue); // alpha?
        const textColor = ((red*0.299 + green*0.587 + blue*0.114) > 186) ? "#000000" : "#ffffff"; // alpha?
        colorDiv.innerHTML = `<span style="color: ${textColor}">${hex}</span>`;
        // console.log((red*0.299 + green*0.587 + blue*0.114) > 186);

        colorDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, ${alpha})`;
        // need to align text in center or smth
    }
    return true;
});