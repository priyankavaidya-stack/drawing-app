// Step 1
const canvas = document.querySelector("canvas"),
// Step 9 starts //
// Starting to draw diagrams
toolBtns = document.querySelectorAll('.tool'),
// Step 9 ends here //

// step 12 to fill rectangle if box is checked
fillColor = document.querySelector("#fill-color"),

// step 15 
// let's change the brush size a/c to the slider
sizeSlider = document.querySelector("#size-slider"),

// step 16
// let's work on diff colors
colorBtns = document.querySelectorAll(".colors .option"),

// Step 17
// Let's work on color picker to pick color and reflect it in color button
colorPicker = document.querySelector("#color-picker"),

// Step 19
// work on clear canvas btn
clearCanvas = document.querySelector(".clear-canvas"),


// Step 20
// work on save image btn
saveImg = document.querySelector(".save-img"),

// step 1
ctx = canvas.getContext("2d"); // getContext() method returns a drawing context on the canvas


// Global variables with default value
// Step 11
// To get width and height for rect, creating global variables and pass mousedown pointer values
let prevMouseX, prevMouseY,snapshot,
// Step 4 
isDrawing = false,
// Step 10 for triangle drawing
selectedTool = "brush",
// Step 8
brushWidth = 5,
// step 16 continue to change brush color
selectedColor = "#000";

// we r doing this so that transparent background image will not be there
// means white background img will be downloaded
const setCanvasBackground = () => {
    // setting whole canvas background to the white, so the downloaded will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // setting fillstyle back to the selectedCOlro, it'll be the brush color
    ctx.fillStyle = selectedColor;
}

// Step 3
// Let's set width and height to the canvas then it's draw property
// when we did not set canvas height and width, mouse pointer was at one place,
// and drawing was starting from another place, so we had to set the width/height of element that actually viewable
window.addEventListener("load", () => {
    // Setting canvas width/height... offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // After this drawing will be in proper way,
    // following the mouse pointer.
    // but next problem will be that it is immediately starts 
    // to draw as we enter mouse cursor on canvas
    // to solve this problem , we will draw only when we click mouse btn
    // and move pointer ---> Step 4

    // Step 20 following
    setCanvasBackground();
})


//Step 11 
// function to draw rectangle
const drawRect = (e) => {
    // step 12 here for checking box is checked or not
    // if fillColor is checked, draw a rect with border else draw rect with background
    if(!fillColor.checked){
        // strokeRect(x-coordinate, y-coordinate, width,height)
        // creating rectangle a/c to mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
        return ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

// Step 13
// function to draw circle
const drawCircle = (e) => {
    //creating a new path to draw circle
    ctx.beginPath();
    // Getting radius for circle a/c to mouse pointer
    //Power method returns the value of x to the power of y
    // sqrt method returns the square root of a number
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2) + Math.pow((prevMouseY - e.offsetY),2))
    // ctx arc(x-coordinate, y-coordinate, radius, start angle, end angle)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    // if the fillColor is checked fill circles else draw border circles
    fillColor.checked ? ctx.fill() : ctx.stroke(); 
}

// Step 14 
// function to draw triangle
const drawTriangle = (e) => {
    // creating a new path to draw circle
    ctx.beginPath();
    // moveTo() method moves the path to the specified point
    // moving triangle to the mouse pointer
    ctx.moveTo(prevMouseX, prevMouseY);
    // craeting first line a/c to mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY);
    // creating bottom line of triangle
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    // closing path of a triangle so the third line draw automatically
    ctx.closePath();
    // if the fillCOlor is checked, fill triangle else draw border triangle
    fillColor.checked ? ctx.fill() : ctx.stroke(); 

}

// Step 5 calling function here... 
const startDraw = (e) => {
    isDrawing = true;

    // step 11
    // passing current mouseX position as prevMouseX value
    prevMouseX = e.offsetX;
    // passing current mouseY position as prevMouseY value
    prevMouseY = e.offsetY;

    // Step 7
    // beginPath() method create a new path to drawpoint
    // creating new path to draw
    ctx.beginPath();

    // Step 8
    // lineWidth property sets the line width
    // passing brushWidth as line width
    ctx.lineWidth =  brushWidth;

    // step 16 here to asign slected color to brush color
    // passing selectedColor as stroke style
    ctx.strokeStyle = selectedColor;
    // passing selectedColor as fill color
    ctx.fillStyle = selectedColor;

    // step 11
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

}

// Step 2
const drawing = (e) => {
    // following step 4 here 
    // if isDrawing is false then return nothing from here.
    if(!isDrawing) return;

    // step 11
    // adding copied canvas data on to this canvas to get perfect diagram
    ctx.putImageData(snapshot, 0, 0);

    // step 10
    if(selectedTool === "brush" || selectedTool === "eraser"){
        // Step 18 Eraser
        // if selected tool is eraser then set strokeStyle to white
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        
        // step 10 part here continue with abve function
        // offsetX, offsetY returns x and y coordinate of the mouse pointer
        // creating a line a/c to the mouse pointer move
        ctx.lineTo(e.offsetX, e.offsetY);
        // drawing/filling the line with color
        ctx.stroke();
    }
    // Step 10 continue to draw triangle
    else if(selectedTool === "rectangle"){
        // calling fun to draw rectangle
        drawRect(e);
    }
     // Step 13 continue to draw circle
     else if(selectedTool === "circle"){
        // calling fun to draw circle
        drawCircle(e);
    }
     // Step 14 to draw triangle
     else if(selectedTool === "triangle"){
        // calling fun to draw triangle
        drawTriangle(e);
    }
    

}

// Step 9 Continue
toolBtns.forEach(btn => {
    // Adding a click event to all tool option
    btn.addEventListener("click",() => {
        // Remove action class from  the previous option and adding on current clicked option 
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

// Step 15 to change slider and change brush size a/c to it
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value)

// Step 16 to work on diff colors
colorBtns.forEach(btn => {
    // Adding click event to all color button
    btn.addEventListener("click", () => {
        // we need to pass selected class to the selector color
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");

        // let's change the color of brush a/c to selected color
        // here clicking color btn, its background-color we get and stored in selectedColor
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");

    });
});

// Step 17
// Last color btn color picker
colorPicker.addEventListener("change", () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

// Step 19
// to clear whole drawings from page 
clearCanvas.addEventListener("click", () => {
    // to clear whole canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

// Step 20
saveImg.addEventListener("click", () => {
    // creating <a> element
    const link = document.createElement("a");
    // passing current date as link download value
    link.download = `${Date.now()}.jpg`;
    // canvas.toDataURL() method returns a data URL of the image
    // passing canvasData as link href value
    link.href = canvas.toDataURL();
    // clicking link to download image
    link.click();
});

// Step 5, to start drawing when mousedown
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);

// Step 6
// Setting isDrawing value to false on mouse up
// After doing this, you will see the drawing is starting and stopping when we want 
// but next time drawing starts from where it left
//so to fix this go to ---> Step 7
canvas.addEventListener("mouseup", () => isDrawing = false);

