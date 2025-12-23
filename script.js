function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startCycleVisualization() {
    const container = document.getElementById("cycle-list");
    const status = document.getElementById("statusText");
    
    const nodeCount = 6; // Total nodes in our "race"
    container.innerHTML = ""; 

    // Create the stepping stones
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement("div");
        node.className = "node"; 
        node.innerText = i;
        container.appendChild(node);
    }

    const nodes = document.getElementsByClassName("node");
    let slow = 0;
    let fast = 0;
    status.textContent = "The race is on! 🏁";

    while (true) {
        // Clear old tracks
        for(let n of nodes) {
            n.classList.remove("slow-pointer", "fast-pointer", "collision");
        }

        // Move Tortoise (1 step) and Hare (2 steps)
        slow = (slow + 1) % nodeCount; 
        fast = (fast + 2) % nodeCount;

        // Add visual pointers
        nodes[slow].classList.add("slow-pointer");
        nodes[fast].classList.add("fast-pointer");

        await sleep(800); 

        // CHECK: Did the Hare catch the Tortoise?
        if (slow === fast) {
            nodes[slow].classList.add("collision");
            status.textContent = "Cycle Detected! 🐢 and 🐰 met at Node " + slow + "! 🎉";
            break; 
        }
    }
}