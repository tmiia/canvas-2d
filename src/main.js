console.log( 'hello world' )

const domApp = document.getElementById( 'app' )

const width = 400
const height = 600

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )


const lines = 20;
const cols = 20;

function drawLines(nb) {
  for (let i = 0; i <= nb; i++) {
    ctx.beginPath();
    ctx.moveTo((height / nb * i), 0);
    ctx.lineTo((height / nb * i), height);
    ctx.stroke();
  }
}

function drawCols(nb) {
  for (let i = 0; i <= nb; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (width / nb * i));
    ctx.lineTo(width, (width / nb * i));
    ctx.stroke();
  }
}


function drawGrid(lines, cols) {
  drawLines(lines);
  drawCols(cols);
}

// drawGrid(lines, cols);

// function drawSquare(nbSquare) {
//   const wCell = width / cols
//   const hCell = height / lines
//   for (let j = 0; j < cols; j++) {
//     for (let i = 0; i < lines; i++) {
//       let pw = wCell / j;
//       let ph = hCell / i;

//       let currentW = wCell
//       let currentH = hCell

//       for (let k = 0; k < nbSquare; k++) {
//         selectColor()

//         let x = (wCell * i) // - pw
//         x += ( wCell - currentW ) / 2

//         let y = (hCell * j) // - ph
//         y += ( hCell - currentH ) / 2

//         ctx.fillRect(x,y,currentW,currentH)

//         const ratio = 0.8
//         currentW *= ratio
//         currentH *= ratio
//       }
//     }
//   }
// }

function drawSquare(nbSquare) {
  const wCell = height / cols
  const hCell = height / lines
  let force = 0;

  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < lines; i++) {
      let pw = wCell / j;
      let ph = hCell / i;

      let currentW = wCell
      let currentH = hCell

      let percent = j / lines;

      for (let k = 0; k < nbSquare; k++) {
        ctx.save()
        ctx.beginPath()
        selectColor()

        let x = (wCell * i)
        x += ( wCell - currentW ) / 2

        let y = (hCell * j)
        y += ( hCell - currentH ) / 2


        ctx.translate( x, y )

        ctx.translate( wCell * .5, hCell * .5 )

        ctx.rotate(((j * force) * ( Math.random() * 360)) * Math.PI/180);
        ctx.translate( -wCell * .5, -hCell * .5 )

        ctx.translate( 50 * percent * Math.random() * 2 -1, 50 * percent * Math.random() * 2 -1)

        ctx.rect(0, 0, currentW, currentH);
        ctx.fill()
        ctx.closePath()

        ctx.restore();



        const ratio = 0.8
        currentW *= ratio
        currentH *= ratio
        force += 0.0001;
      }
    }
  }
}

function selectColor(){
  ctx.fillStyle = `rgb(50, 40, ${Math.random() * 255})`;
}

drawSquare(1);
