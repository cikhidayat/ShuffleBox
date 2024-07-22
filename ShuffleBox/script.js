document.addEventListener('DOMContentLoaded', (event) => {
    const boxes = document.querySelectorAll('.box');
    const shuffleBtn = document.getElementById('shuffleBtn');
    let selectedBoxes = new Set();

    function shuffle() {
        if (selectedBoxes.size === 9) {
            alert('All boxes have been selected!');
            return;
        }

        let previousIndex = -1;
        let shuffleInterval = setInterval(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 9);
            } while (selectedBoxes.has(randomIndex));

            if (previousIndex !== -1 && !selectedBoxes.has(previousIndex)) {
                boxes[previousIndex].style.backgroundColor = '#FFFFFF'; // Reset previous box color
            }

            boxes[randomIndex].style.backgroundColor = '#FFD700'; // Highlight one box with gold color
            previousIndex = randomIndex;
        }, 100);

        setTimeout(() => {
            clearInterval(shuffleInterval);

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * 9);
            } while (selectedBoxes.has(randomIndex));

            selectedBoxes.add(randomIndex);
            boxes.forEach((box, index) => {
                if (index === randomIndex) {
                    box.style.backgroundColor = '#FFD700'; // Keep the selected box gold
                } else if (!selectedBoxes.has(index)) {
                    box.style.backgroundColor = '#FFFFFF'; // Reset other boxes
                }
            });
        }, 2000);
    }

    shuffleBtn.addEventListener('click', shuffle);
});
