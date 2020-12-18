const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
} 

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x ,y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handelRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handelModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paint[🎨]';
    link.click()

}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM)
}

// Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
Array.from(colors).forEach(
    //1.1.  Array.from(colors)는 html collection을 배열로 변경시켜줌
    //1.2. (9) [div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor, div.controls_color.jsColor]

    //2.1. forEach 메서드로 각 배열을 함수에 호출함
    //2.2. 매개변수 color에 배열 객체가 하나씩 들어가고
    //2.3. 그 객채를 클릭하면 handleColorClick 함수가 실행됨. 
    function(color){
        color.addEventListener('click', handleColorClick)
    }
    );

if(range){
    range.addEventListener('input', handelRangeChange);
};

if(mode){
    mode.addEventListener('click', handelModeClick)
};

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick)
}