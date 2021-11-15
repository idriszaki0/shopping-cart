let items_array = [
    { "name": "carrots", "id": 1, count: 1 },
    { "name": "spinach", "id": 2, count: 1 },
    { "name": "cookies", "id": 3, count: 1 },
    { "name": "lettuce", "id": 4, count: 1 },
    { "name": "avocado", "id": 5, count: 1 },
];

let cart = [];


function appendNode(parent, element) {
    parent.appendChild(element);
}; // the appendNode function will append a new node to the parent node. It will take the parent node and the new node as parameters.

function getDiv(container) {
    return document.getElementById(container);
}; //the getDiv function will return the div element with the id of a container

function createNode(node) {
    let element = document.createElement(node);
    return element;
};// the createNode function will create a new node and return it. Iw will take a node as a parameter.

//function that  will display the shopping list

function displayItems(items, container) {  // the displayItems function will take the items array and teh container id as parameters. It will display the items in the DOM.
    let items_container = getDiv(container); // the fucntion will iterate through the items array and create a new node for eachm.  iteIt will set the id of the node to the item id. The displayItems function will then append the node container
    items_container.innerHTML = ''; // If you look closely, you notice that we are using the setAttribute method to set the attribute of the node. setAttribute is in-build method used to add attributes to a node.

    for (let i = 0; i < items.length; i++) { // the displayItems also clears the lists before updating them by setting the innerHTMl property of the container to empty. This is done to avoid the previous items from showing up
        let item = items[i];

        let item_node = createNode("li");
        item_node.setAttribute("id", item.id);

        if (item.count > 0 ) {
            item_node.innerHTML = `${item.name}
            <span id="badge">${item.count}</span>`;
            appendNode(items_container, item_node);
        }
    }
}

displayItems(items_array, "items");

function addOrRemoveItemsFromCart(action) {
    let container = '';

    function takeAction(container) {
        container.addEventListener("click", function (event) {
            let item_id = event.target.id;

            if (item_id !== "items" && item_id !== "badge") {
                let item = items_array.filter(function (item) {
                    return item.id == item_id;
                })[0];

                let already_in_cart = cart.filter(function (item) {
                    return item.id == item_id;
                })[0];

                if (already_in_cart == undefined) {
                    cart.push(item);
                } else if (action == "add") {
                    already_in_cart.count++;
                } else if (action == "remove") {
                    already_in_cart.count--;
                }

                console.log(cart);
                displayItems(cart, "cart")
            }
        })
    };

    if (action == "add") {
        container = getDiv("items");

        takeAction(container)
    }

    else if (action == "remove") {
        container = getDiv("cart");

        takeAction(container)
    };
};

addOrRemoveItemsFromCart('add');
addOrRemoveItemsFromCart('remove')