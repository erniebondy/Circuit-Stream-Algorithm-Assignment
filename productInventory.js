const quickSort = require("./quicksort");

class Product {
    constructor(id, name, category, price, quantity) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }
}

class Inventory {
    
    items = [];

    add(id, name, category, price, quantity) {
        const p = new Product(id, name, category, price, quantity);
        this.items.push(p);
    }

    searchById(id) {
        return this.items.find(item => item.id === id);
    }

    searchByName(name) {
        return this.items.find(item => item.name === name);
    }

    checkProductId(id) {
        const productToUpdate = this.searchById(id);
        
        /** Check if product is available */
        if (!productToUpdate) {
            console.log(`No product found with id: ${id}`);
        }

        return productToUpdate;
    }

    updateName(id, name) {
        let productToUpdate = this.checkProductId(id);        
        if (productToUpdate) productToUpdate.name = name;
    }

    updateCategory(id, category) {
        let productToUpdate = this.checkProductId(id);
        if (productToUpdate) productToUpdate.category = category;
    }

    updatePrice(id, price) {
        let productToUpdate = this.checkProductId(id);
        if (productToUpdate) productToUpdate.price = price;
    }

    updateQuantity(id, quantity) {
        let productToUpdate = this.checkProductId(id);
        if (productToUpdate) productToUpdate.quantity = quantity;
    }

    filterById(id) {
        return this.items.filter(value => value.id === id);
    }

    filterByCategory(category) {
        return this.items.filter(value => value.category === category);
    }

    filterByPrice(price) {
        return this.items.filter(value => value.price === price);
    }

    filterByQuantity(quantity) {
        return this.items.filter(value => value.quantity === quantity);
    }
}



const myInventory = new Inventory();

myInventory.add(3, "product_3", "category_3", 8.75, 15);
myInventory.add(1, "product_1", "categoryTest", 5.99, 10);
myInventory.add(2, "product_2", "category_2", 12.50, 5);
myInventory.add(5, "product_5", "categoryTest", 14.25, 8);
myInventory.add(4, "product_4", "categoryTest", 22.00, 3);

// partition function
// sortOption determines how the phonebook is to be sorted
function partition(arr, low, high, sortOption)
{

    // choose the pivot
    let pivot = arr[high][sortOption];

    // index of smaller element and indicates
    // the right position of pivot found so far
    let i = low - 1;

    // traverse arr[low..high] and move all smaller
    // elements to the left side. Elements from low to
    // i are smaller after every iteration
    for (let j = low; j < high; j++) {
        if (arr[j][sortOption] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }

    // move pivot after smaller elements and
    // return its position
    swap(arr, i + 1, high);
    return i + 1;
}

// swap function
function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// the QuickSort function implementation
function quickSort(arr, low, high, sortOption)
{
    if (low < high) {

        // pi is the partition return index of pivot
        let pi = partition(arr, low, high, sortOption);

        // recursion calls for smaller elements
        // and greater or equals elements
        quickSort(arr, low, pi - 1, sortOption);
        quickSort(arr, pi + 1, high, sortOption);
    }
}

quickSort(myInventory.items, 0, myInventory.items.length-1, "price");
console.log(myInventory);

//console.log(myInventory.filterByCategory("categoryTest"));