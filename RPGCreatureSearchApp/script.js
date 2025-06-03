const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const creatureId = document.getElementById("creature-id");
const creatureName = document.getElementById("creature-name");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypesContainer = document.getElementById("elements"); 
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const creatureHp = document.querySelector("#hp + td");
const creatureAttack = document.querySelector("#attack + td");
const creatureDefense = document.querySelector("#defense + td");
const creatureSpAttack = document.querySelector("#special-attack + td");
const creatureSpDefense = document.querySelector("#special-defense + td");
const creatureSpeed = document.querySelector("#speed + td");

const searchCreature = () => {
    if (searchInput.value === "") {
        alert("Please insert a creature name or an Id.");
        return;
    }
    const urlData = searchInput.value.toLowerCase().replace(/\s/g, '-');
    const creatureUrl = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${urlData}`;
    fetchData(creatureUrl);
}

const fetchData = async (url) => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(errorMessage);
        }

        let data = await res.json();

        updateCreatureInfo(data);

    } catch (err) {
        alert("Creature not found");
        clearCreatureInfo();
    }
};

const updateCreatureInfo = (data) => {

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    creatureWeight.textContent = `Weight: ${data.weight}`;
    creatureHeight.textContent = `Height: ${data.height}`;

    creatureTypesContainer.innerHTML = ''; 
        data.types.forEach(typeInfo => {
                const typeSpan = document.createElement('span');
                typeSpan.textContent = typeInfo.name.toUpperCase();
                typeSpan.classList.add('type-tag');
                creatureTypesContainer.appendChild(typeSpan);
        });

        specialName.textContent = `${data.special.name}`;
        specialDescription.textContent = data.special.description;


    const statsMap = {};
        data.stats.forEach(statInfo => {
                statsMap[statInfo.name] = statInfo.base_stat;
        });

    creatureHp.textContent = statsMap.hp || '';
    creatureAttack.textContent = statsMap.attack || '';
    creatureDefense.textContent = statsMap.defense || '';
    creatureSpAttack.textContent = statsMap['special-attack'] || '';
    creatureSpDefense.textContent = statsMap['special-defense'] || '';
    creatureSpeed.textContent = statsMap.speed || '';
}

const clearCreatureInfo = () => {
    creatureName.textContent = '';
    creatureId.textContent = '';
    creatureWeight.textContent = '';
    creatureHeight.textContent = '';
    creatureTypesContainer.innerHTML = '';
    specialName.textContent = '';
    specialDescription.textContent = '';
    creatureHp.textContent = '';
    creatureAttack.textContent = '';
    creatureDefense.textContent = '';
    creatureSpAttack.textContent = '';
    creatureSpDefense.textContent = '';
    creatureSpeed.textContent = '';
}

searchButton.addEventListener("click", searchCreature);