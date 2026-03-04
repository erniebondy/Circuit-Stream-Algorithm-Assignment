let phonebook = [];

class Entry {
    constructor(name, phoneNumber, address) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}



// partition function
function partition(arr, low, high, sortOption)
{

    // choose the pivot
    let pivot; //= arr[high];
    if (sortOption === "name") {
        pivot = arr[high].name;
    } else if (sortOption === "phoneNumber") {
        pivot = arr[high].phoneNumber;
    } else if (sortOption === "address") {
        pivot = arr[high].address;
    }


    

    // index of smaller element and indicates
    // the right position of pivot found so far
    let i = low - 1;

    // traverse arr[low..high] and move all smaller
    // elements to the left side. Elements from low to
    // i are smaller after every iteration
    for (let j = low; j <= high - 1; j++) {
        
        let value;
        if (sortOption === "name") {
            value = arr[j].name;
        } else if (sortOption === "phoneNumber") {
            value = arr[j].phoneNumber;
        } else if (sortOption === "address") {
            value = arr[j].address;
        }

        if (value < pivot) {
        //if (arr[j] < pivot) {
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


function main() {
    for (let i = 0; i < 100; i++) {
        const randomName = "contact_" + Math.floor(Math.random() * 100) + 100;
        const randomPhone = Math.floor(Math.random() * 9000000000) + 1000000000;
        const randomAddress = (Math.floor(Math.random() * 999) + 1) + " Random Street";
        phonebook.push(new Entry(randomName, randomPhone, randomAddress));
    }
    let n = phonebook.length;
    quickSort(phonebook, 0, n - 1, "address");
    console.log(phonebook);
}

main();


// Driver Code
//const sortOption = "phoneNumber";

// call QuickSort on the entire array


// for (let i = 0; i < phonebook.length; i++) {
//     console.log(phonebook[i] + " ");
// }