// script.js

document.addEventListener('DOMContentLoaded', () => {
    const tower = document.getElementById('tower');
    const dropBlockBtn = document.getElementById('dropBlockBtn');
    const levelSpan = document.getElementById('level');
    const scoreSpan = document.getElementById('score');

    let level = 0;
    let score = 0;
    let blockWidth = 100;

    function createBlock() {
        const block = document.createElement('div');
        block.className = 'block';
        block.style.width = `${blockWidth}px`;
        block.style.height = '20px';
        block.style.background = '#00bcd4';
        return block;
    }

    function handleBlockDrop() {
        const newBlock = createBlock();
        const previousBlock = tower.lastElementChild;

        // Добавляем анимацию падения блока
        newBlock.classList.add('drop');
        tower.appendChild(newBlock);

        // Вычисляем размеры и разницу
        const previousBlockWidth = previousBlock ? previousBlock.offsetWidth : blockWidth;
        const newBlockWidth = Math.random() * 100 + 50;

        newBlock.style.width = `${newBlockWidth}px`;

        // Отрезаем часть блока, если не совпадают ширины
        if (previousBlock) {
            const overlap = previousBlockWidth - newBlockWidth;
            if (overlap > 0) {
                const cutBlock = document.createElement('div');
                cutBlock.className = 'cut-block';
                cutBlock.style.width = `${overlap}px`;
                cutBlock.style.height = '20px';
                cutBlock.style.position = 'absolute';
                cutBlock.style.bottom = '0';
                cutBlock.style.left = `${newBlockWidth}px`;
                tower.appendChild(cutBlock);

                // Добавляем анимацию для отрезанной части
                cutBlock.classList.add('cut-block');
            }

            // Увеличиваем уровень и счёт
            level++;
            score += level;
        } else {
            level = 1;
            score = 0;
        }

        // Обновляем ширину нового блока и счет
        blockWidth = newBlockWidth;
        levelSpan.textContent = level;
        scoreSpan.textContent = score;
    }

    dropBlockBtn.addEventListener('click', handleBlockDrop);

    // Начальный блок
    handleBlockDrop();
});
