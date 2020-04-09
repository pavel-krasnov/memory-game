const pickRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
};

export const pickCardPairsWithRandomColor = (itemsCount) => {
    const colors = [];
    for (let i = 0; i < itemsCount / 2; i++) {
        colors.push({
            id: i,
            color: pickRandomColor(),
            open: false
        });
    }
    const result = colors.concat(colors);
    for (let i = 0; i < result.length; i++) {
        const j = Math.floor(Math.random() * result.length);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.map((item, index) => ({...item, id: index}));
}