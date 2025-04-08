const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

const tileOrder = [...Array(9).keys()];
tileOrder.sort(() => Math.random() - 0.5);

function isSolved(order) {
  return order.every((val, i) => val === i);
}

function renderPuzzle() {
  puzzle.innerHTML = "";
  tileOrder.forEach((index, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.backgroundImage = index === 8 ? "none" : "url('images/puzzle-img.jpg')";
    tile.style.backgroundPosition = `-${(index % 3) * 100}px -${Math.floor(index / 3) * 100}px`;
    if (index === 8) tile.classList.add("hidden");
    tile.addEventListener("click", () => moveTile(i));
    puzzle.appendChild(tile);
  });
}

function moveTile(i) {
  const emptyIndex = tileOrder.indexOf(8);
  const validMoves = [i - 1, i + 1, i - 3, i + 3];
  if (validMoves.includes(emptyIndex)) {
    [tileOrder[i], tileOrder[emptyIndex]] = [tileOrder[emptyIndex], tileOrder[i]];
    renderPuzzle();
    if (isSolved(tileOrder)) {
      message.textContent = "Yay! You did it 💖 Now go to the next page...";
      setTimeout(() => {
        window.location.href = "proposal.html";
      }, 3000);
    }
  }
}

renderPuzzle();
