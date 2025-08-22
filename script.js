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
    img: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
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

// Add base items
for (const base of fakeItemsBase) {
    const limit = Math.random() < 0.35 ? fakeLimits[Math.floor(Math.random()*fakeLimits.length)] : "Permanent";
    items.push({ ...base, limit });
}

// Add rare item
items.push({ ...rareItem, limit: "Permanent" });

// Add vouchers
for (let i = 0; i < 500; i++) {
    let limit = Math.random() < 0.7 ? `${[3,7,15,30][Math.floor(Math.random()*4)]} Days` : "Permanent";
    items.push({
        ...voucherItem,
        name: `Voucher x${Math.floor(Math.random()*10)+1}`,
        limit,
    });
}

const itemsDiv = document.getElementById('items');

// Show only 15 items at a time
function renderItems() {
    itemsDiv.innerHTML = '';
    let indices = [];
    while (indices.length < 15) {
        let idx = Math.floor(Math.random()*items.length);
        if (!indices.includes(idx)) indices.push(idx);
    }
    indices.forEach(idx => {
        const item = items[idx];
        const div = document.createElement('div');
        div.className = 'item' + (item.rare ? ' rare' : '');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <br><span>${item.name}</span>
            <div class="limit">${item.limit || ""}</div>
            ${item.rare ? '<div class="rare-badge">RARE</div>' : ''}
        `;
        itemsDiv.appendChild(div);
    });
}
renderItems();

// Voucher logic
let vouchers = 100;
const voucherCounter = document.getElementById("voucherCounter");
const spin1Btn = document.getElementById("spin1Btn");
const spin10Btn = document.getElementById("spin10Btn");

const rewardDialog = document.getElementById("rewardDialog");
const rewardTitle = document.getElementById("rewardTitle");
const rewardItems = document.getElementById("rewardItems");
const closeDialog = document.getElementById("closeDialog");

function updateVoucherCount() {
    voucherCounter.textContent = `Vouchers: ${vouchers}`;
}

function spinLuckRoyale(count) {
    if (vouchers < count) {
        alert("Not enough vouchers!");
        return;
    }
    vouchers -= count;
    updateVoucherCount();

    let wonItems = [];
    for (let i = 0; i < count; i++) {
        let idx = Math.floor(Math.random()*items.length);
        wonItems.push(items[idx]);
    }

    // Show reward dialog
    rewardItems.innerHTML = "";
    wonItems.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${item.rare ? `<span class="rare-item">[RARE]</span>` : ""} ${item.name} (${item.limit || "Permanent"})</p>`;
        rewardItems.appendChild(div);
    });

    rewardTitle.textContent = wonItems.some(it => it.rare) 
        ? "🎉 Congratulations! 🎉"
        : "Your Rewards";
    rewardDialog.classList.remove("hidden");
}

// Close dialog
closeDialog.addEventListener("click", () => {
    rewardDialog.classList.add("hidden");
});

// Spin buttons
spin1Btn.addEventListener("click", () => spinLuckRoyale(1));
spin10Btn.addEventListener("click", () => spinLuckRoyale(10));

updateVoucherCount();
     
