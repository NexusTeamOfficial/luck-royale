// Fake Luck Royale Item Pool

const fakeLimits = ['3 Days', '7 Days', '15 Days', '30 Days', 'Permanent'];
const fakeItemsBase = [
    { name: "Shadow Strike Bundle", img: "https://cdn-icons-png.flaticon.com/512/3135/3135793.png", theme: "Bundle" },
    { name: "Diamond Duke Set", img: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png", theme: "Bundle" },
    { name: "Firestorm AK47", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", theme: "Gun" },
    { name: "Cyber Katana", img: "https://cdn-icons-png.flaticon.com/512/3135/3135709.png", theme: "Melee" },
    { name: "Dragon Backpack", img: "https://cdn-icons-png.flaticon.com/512/3135/3135737.png", theme: "Backpack" },
    { name: "Legendary Emote", img: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png", theme: "Emote" },
    { name: "Cool Skin", img: "https://cdn-icons-png.flaticon.com/512/3135/3135778.png", theme: "Skin" },
    { name: "Elite Pass", img: "https://cdn-icons-png.flaticon.com/512/3135/3135793.png", theme: "Pass" },
    { name: "Pet (Cute Cat)", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png", theme: "Pet" },
    { name: "Plasma M1887", img: "https://cdn-icons-png.flaticon.com/512/3135/3135724.png", theme: "Gun" },
    { name: "Night Howler Mask", img: "https://cdn-icons-png.flaticon.com/512/3135/3135733.png", theme: "Mask" },
    { name: "Royal Crown", img: "https://cdn-icons-png.flaticon.com/512/3135/3135749.png", theme: "Headgear" },
    { name: "Neon Board", img: "https://cdn-icons-png.flaticon.com/512/3135/3135701.png", theme: "Surfboard" },
    { name: "Toxic Bat", img: "https://cdn-icons-png.flaticon.com/512/3135/3135722.png", theme: "Melee" },
    { name: "DJ Dance Emote", img: "https://cdn-icons-png.flaticon.com/512/3135/3135766.png", theme: "Emote" },
    { name: "Samurai Katana", img: "https://cdn-icons-png.flaticon.com/512/3135/3135709.png", theme: "Melee" },
    { name: "Frosty Grenade", img: "https://cdn-icons-png.flaticon.com/512/3135/3135757.png", theme: "Grenade" },
    { name: "Hacker Hoodie", img: "https://cdn-icons-png.flaticon.com/512/3135/3135772.png", theme: "Outfit" },
    { name: "Angel Wings", img: "https://cdn-icons-png.flaticon.com/512/3135/3135705.png", theme: "Backpack" },
    { name: "Shadow Panther", img: "https://cdn-icons-png.flaticon.com/512/3135/3135734.png", theme: "Pet" }
];

// Rare item
const rareItem = {
    name: "Mythic Dragon AK47",
    img: "https://cdn-icons-png.flaticon.com/512/616/616408.png", // Replace with rare image if you want
    theme: "Gun",
    rare: true
};

// Vouchers
const voucherImg = "https://cdn-icons-png.flaticon.com/512/3135/3135790.png";
const voucherItem = {
    name: "Luck Royale Voucher",
    img: voucherImg,
    theme: "Voucher",
    limit: "Use: 30 Days"
};

let items = [];

// Add base items with random limits and theme
for (const base of fakeItemsBase) {
    const limit = Math.random() < 0.35 ? fakeLimits[Math.floor(Math.random()*fakeLimits.length)] : "Permanent";
    items.push({
        ...base,
        limit,
    });
}

// Add rare item (low probability)
items.push({
    ...rareItem,
    limit: "Permanent",
});

// Add 1000 vouchers
for (let i = 0; i < 1000; i++) {
    let limit = Math.random() < 0.7 ? `${[3,7,15,30][Math.floor(Math.random()*4)]} Days` : "Permanent";
    items.push({
        ...voucherItem,
        name: `Voucher x${Math.floor(Math.random()*10)+1}`,
        limit,
    });
}

const itemsDiv = document.getElementById('items');
const resultDiv = document.getElementById('result');
const spinBtn = document.getElementById('spinBtn');

// Show only 15 items at a time, but can land on any of the pool (simulate real royale)
function renderItems(selectedIndex = null, showIndices = []) {
    itemsDiv.innerHTML = '';
    // If no indices provided, just show random 15
    if (showIndices.length === 0) {
        let indices = [];
        while (indices.length < 15) {
            let idx = Math.floor(Math.random()*items.length);
            if (!indices.includes(idx)) indices.push(idx);
        }
        showIndices = indices;
    }
    showIndices.forEach((idx, i) => {
        const item = items[idx];
        const div = document.createElement('div');
        div.className = 'item' + (selectedIndex===i ? ' selected' : '') + (item.rare ? ' rare' : '');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <br><span>${item.name}</span>
            <div class="limit">${item.limit || ""}</div>
            ${item.rare ? '<div class="rare-badge">RARE</div>' : ''}
        `;
        itemsDiv.appendChild(div);
    });
}

// Spinning logic
function spinLuckRoyale() {
    spinBtn.disabled = true;
    resultDiv.textContent = '';
    // Pick 15 random indices from pool for display
    let showIndices = [];
    while (showIndices.length < 15) {
        let idx = Math.floor(Math.random()*items.length);
        if (!showIndices.includes(idx)) showIndices.push(idx);
    }
    // Select winIndex from pool (can be outside shown 15 for realism, but we'll keep inside)
    let winIdxOnScreen = Math.floor(Math.random()*15);
    let winItemGlobalIdx = showIndices[winIdxOnScreen];

    let highlightIndex = 0;
    let totalSpins = Math.floor(Math.random()*15) + 18;
    let delay = 70;
    let interval;

    renderItems();

    interval = setInterval(() => {
        renderItems(highlightIndex % 15, showIndices);
        highlightIndex++;
        if (highlightIndex > totalSpins) {
            clearInterval(interval);
            renderItems(winIdxOnScreen, showIndices);
            const winItem = items[winItemGlobalIdx];
            let msg = `You got: <b>${winItem.name}</b> `;
            if (winItem.limit) msg += `(${winItem.limit})`;
            if (winItem.rare) msg += ' <span style="color:#0ff;font-weight:bold;">[SUPER RARE!]</span>';
            resultDiv.innerHTML = msg;
            spinBtn.disabled = false;
        }
        delay += 10;
    }, delay);
}

renderItems();

spinBtn.addEventListener('click', spinLuckRoyale);
