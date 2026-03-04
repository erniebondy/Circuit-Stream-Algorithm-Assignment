class FamilyTree {
    
    members = new Set();
    
    addMember(name, age, dateOfBirth, details) {
        const m = new Member(this.members.size + 1, name, age, dateOfBirth, details);
        this.members.add(m);
        return m;
    }    
}

class Member {
    parents = new Set();
    children = new Set();
    
    constructor(id, name, age, dateOfBirth, details) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
        this.details = details;
    }

    addChild(child, parent2 = null) {
        this.children.add(child);
        child.parents.add(this);
        if (parent2) {
            parent2.children.add(child);
            child.parents.add(parent2);
        }
    }

    printDecendants(level = 0) {
        //parent = parent == null ? this : parent;
        if (this.children.size < 1) {
            return;
        }
        if (level === 0) {
            console.log(`Decendants of ${this.name}`);
        }
        for (let c of this.children) {
            console.log("  ".repeat(level + 1) + c.name);
            c.printDecendants(level + 1);
        }
    }

    printTree(isRoot = true, level = 1) {
        if (isRoot) {
            console.log(this.name);
        }
        let names = "";
        for (let c of this.children) {
            names += c.name + ", ";
        }
        if (names) {
            names = names.substring(0, names.length - 2);
            console.log(level, names);
        }
        for (let c of this.children) {
            c.printTree(false, ++level);
        }
    }
    
}

const family = new FamilyTree();
const john = family.addMember("John", 34, "1992-03-26");
const jane = family.addMember("Jane", 33, "1993-05-16", "john's wife");
const child1 = family.addMember("Child1", 2, "2024-04-12");
const child2 = family.addMember("Child2", 3, "2024-04-12");
const child3 = family.addMember("Child3", 4, "2024-04-12");

john.addChild(child1, jane);
john.addChild(child2, jane);
john.addChild(child3, jane);

const gchild1 = family.addMember("Child1 Child1", 6, "2024-04-12");
const gchild2 = family.addMember("Child1 Child2", 7, "2024-04-12");
child1.addChild(gchild1);
child1.addChild(gchild2);

const gchild3 = family.addMember("Child2 Child1", 8, "2024-04-12");
child2.addChild(gchild3);

//john.printDecendants();
john.printTree();
jane.printTree();


//console.log(family.members);

