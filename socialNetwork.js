//Social networking exercise, utilizing degrees of separation and graph traversal algorithms to find connections between users (Breadth-first search).

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {      
        this.nodes.push(node);
        this.edges[node.id] = [];
    }

    degreesOfSeparation(nodeA, nodeB) {
        if (!this.nodes.includes(nodeA) || !this.nodes.includes(nodeB)) {
            return -1; // Return -1 if either node is not in the graph
        }

        let visited = new Set();
        let queue = [{ node: nodeA, degree: 0 }];

        while (queue.length > 0) {
            let { node, degree } = queue.shift();

            if (node === nodeB) {
                return degree; // Found the target node, return the degree of separation
            }

            visited.add(node);

            for (let neighbor of this.edges[node.id]) {
                if (!visited.has(neighbor)) {
                    queue.push({ node: neighbor, degree: degree + 1 });
                }
            }
        }

        return -1; // Return -1 if there is no connection between nodeA and nodeB
    }

    updateDistance(nodeA, nodeB) {
        // Add the edge in both directions for an undirected graph
        this.edges[nodeA.id].push(nodeB);
        this.edges[nodeB.id].push(nodeA);
    }
}

class person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}


let graph = new Graph();

let personA = new person(1, "Alice");
let personB = new person(2, "Bob");
let personC = new person(3, "Charlie");
let personD = new person(4, "David");
let personE = new person(5, "Eve");
let personF = new person(6, "Frank");
let personG = new person(7, "Bob");


graph.addNode(personA);
graph.addNode(personB);
graph.addNode(personC);
graph.addNode(personD);
graph.addNode(personE);
graph.addNode(personF);
graph.addNode(personG);

graph.updateDistance(personA, personB);
graph.updateDistance(personB, personC);
graph.updateDistance(personC, personD);
graph.updateDistance(personD, personE);
graph.updateDistance(personE, personF);
graph.updateDistance(personB, personE);
graph.updateDistance(personC, personG); // Alice is also connected to Bob (personG)
//randomly test degrees of separation between different nodes in the graph

console.log("Degrees of separation between Alice and Eve:", graph.degreesOfSeparation(personA, personE)); // Should return 4
console.log("Degrees of separation between Alice and Frank:", graph.degreesOfSeparation(personA, personF)); // Should return 5
console.log("Degrees of separation between Bob and David:", graph.degreesOfSeparation(personB, personD)); // Should return 2
console.log("Degrees of separation between Alice and Charlie:", graph.degreesOfSeparation(personA, personC)); // Should return 2
console.log("Degrees of separation between Bob and Eve:", graph.degreesOfSeparation(personB, personE)); // Should return 1
console.log("Degrees of separation between Alice and Bob (personG):", graph.degreesOfSeparation(personA, personG)); // Should return 3
console.log("Degrees of separation between Alice and a non-existent person:", graph.degreesOfSeparation(personA, new person(999, "NonExistent"))); // Should return -1