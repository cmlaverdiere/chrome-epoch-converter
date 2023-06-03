let tooltip = null;

function createTooltip(text, x, y) {
    tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.padding = '5px';
    tooltip.style.backgroundColor = 'black';
    tooltip.style.color = 'white';
    tooltip.style.border = '1px solid white';
    tooltip.style.zIndex = '10000';
    tooltip.innerText = text;
    document.body.appendChild(tooltip);
}

function removeTooltip() {
    if (tooltip) {
        document.body.removeChild(tooltip);
        tooltip = null;
    }
}

function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
}

document.addEventListener('mouseup', function(e) {
    removeTooltip();
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const unixTimestamp = parseInt(selectedText, 10);
    const isUnixTimestamp = /^\d{10}$/.test(selectedText);
    if (!isNaN(unixTimestamp) && isUnixTimestamp) {
        const readableDate = convertUnixTimestamp(unixTimestamp);
        createTooltip(readableDate, e.pageX, e.pageY - 50);
    }
});

document.addEventListener('mousedown', function() {
    removeTooltip();
});
