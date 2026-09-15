
/* =====================================
   GROCERY STOCK MANAGEMENT
===================================== */


/* GET ELEMENTS */

const form =
    document.getElementById("stockForm");

const table =
    document.getElementById("stockTable");

const search =
    document.getElementById("search");


/* =====================================
   LOAD DATA
===================================== */

let products =
    JSON.parse(
        localStorage.getItem("groceryStock")
    ) || [];


/* =====================================
   SAVE DATA
===================================== */

function saveData() {

    localStorage.setItem(
        "groceryStock",
        JSON.stringify(products)
    );

}


/* =====================================
   ADD PRODUCT
===================================== */

form.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        let name =
            document.getElementById(
                "productName"
            ).value.trim();


        let category =
            document.getElementById(
                "category"
            ).value;


        let quantity =
            Number(
                document.getElementById(
                    "quantity"
                ).value
            );


        let unit =
            document.getElementById(
                "unit"
            ).value;


        let price =
            Number(
                document.getElementById(
                    "price"
                ).value
            );


        let minimum =
            Number(
                document.getElementById(
                    "minimum"
                ).value
            );


        /* VALIDATION */

        if (name === "") {

            alert(
                "Please enter product name"
            );

            return;
        }


        if (category === "") {

            alert(
                "Please select category"
            );

            return;
        }


        if (quantity < 0 ||
            price < 0 ||
            minimum < 0) {

            alert(
                "Please enter valid numbers"
            );

            return;
        }


        /* CREATE PRODUCT */

        let product = {

            id:
                Date.now(),

            name:
                name,

            category:
                category,

            quantity:
                quantity,

            unit:
                unit,

            price:
                price,

            minimum:
                minimum

        };


        /* ADD */

        products.push(product);


        /* SAVE */

        saveData();


        /* UPDATE */

        displayProducts();

        updateDashboard();


        /* CLEAR FORM */

        form.reset();


        document.getElementById(
            "minimum"
        ).value = 10;


        alert(
            "✅ Stock added successfully!"
        );

    }
);


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(list = products) {

    table.innerHTML = "";


    if (list.length === 0) {

        table.innerHTML = `

    < tr >

    <td
        colspan="8"
        style="text-align:center;
                    padding:30px">

        📦 No stock available

    </td>

            </tr >

    `;

        return;
    }


    list.forEach(product => {

        let status;

        let statusClass;


        /* STATUS */

        if (product.quantity === 0) {

            status =
                "Out of Stock";

            statusClass =
                "out";

        }

        else if (
            product.quantity <=
            product.minimum
        ) {

            status =
                "Low Stock";

            statusClass =
                "low";

        }

        else {

            status =
                "In Stock";

            statusClass =
                "good";

        }


        /* TOTAL VALUE */

        let value =
            product.quantity *
            product.price;


        table.innerHTML += `

    < tr >

                <td>
                    ${product.id}
                </td>

                <td>
                    <strong>
                        ${product.name}
                    </strong>
                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ${product.quantity}
                    ${product.unit}
                </td>

                <td>
                    ₹${product.price}
                </td>

                <td>
                    ₹${value.toLocaleString()}
                </td>

                <td>

                    <span
                        class="status ${statusClass}">

                        ${status}

                    </span>

                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})">

                        ✏️

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">

                        🗑️

                    </button>

                </td>

            </tr >

    `;

    });

}


/* =====================================
   DASHBOARD
===================================== */

function updateDashboard() {

    /* TOTAL PRODUCTS */

    document.getElementById(
        "totalProducts"
    ).innerText =
        products.length;


    /* TOTAL QUANTITY */

    let totalQuantity =
        products.reduce(
            function(total, product) {

                return total +
                    Number(product.quantity);

            },
            0
        );


    document.getElementById(
        "totalQuantity"
    ).innerText =
        totalQuantity;


    /* LOW STOCK */

    let low =
        products.filter(
            product =>
                product.quantity <=
                product.minimum
        );


    document.getElementById(
        "lowStock"
    ).innerText =
        low.length;


    /* STOCK VALUE */

    let totalValue =
        products.reduce(
            function(total, product) {

                return total +
                    (
                        product.quantity *
                        product.price
                    );

            },
            0
        );


    document.getElementById(
        "stockValue"
    ).innerText =
        totalValue.toLocaleString();


    displayLowStock();

}


/* =====================================
   DELETE
===================================== */

function deleteProduct(id) {

    let product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    let answer =
        confirm(
            "Delete " +
            product.name +
            "?"
        );


    if (!answer) return;


    products =
        products.filter(
            p => p.id !== id
        );


    saveData();

    displayProducts();

    updateDashboard();

}


/* =====================================
   EDIT
===================================== */

function editProduct(id) {

    let product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    document.getElementById(
        "editId"
    ).value =
        product.id;


    document.getElementById(
        "editName"
    ).value =
        product.name;


    document.getElementById(
        "editCategory"
    ).value =
        product.category;


    document.getElementById(
        "editQuantity"
    ).value =
        product.quantity;


    document.getElementById(
        "editPrice"
    ).value =
        product.price;


    document.getElementById(
        "editMinimum"
    ).value =
        product.minimum;


    document.getElementById(
        "editModal"
    ).classList.add("show");

}


/* =====================================
   SAVE EDIT
===================================== */

function saveEdit() {

    let id =
        Number(
            document.getElementById(
                "editId"
            ).value
        );


    let product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    product.name =
        document.getElementById(
            "editName"
        ).value.trim();


    product.category =
        document.getElementById(
            "editCategory"
        ).value;


    product.quantity =
        Number(
            document.getElementById(
                "editQuantity"
            ).value
        );


    product.price =
        Number(
            document.getElementById(
                "editPrice"
            ).value
        );


    product.minimum =
        Number(
            document.getElementById(
                "editMinimum"
            ).value
        );


    saveData();

    displayProducts();

    updateDashboard();

    closeEdit();

}


/* =====================================
   CLOSE EDIT
===================================== */

function closeEdit() {

    document.getElementById(
        "editModal"
    ).classList.remove("show");

}


/* =====================================
   SEARCH
===================================== */

search.addEventListener(
    "input",
    function() {

        let text =
            search.value
            .toLowerCase()
            .trim();


        let filtered =
            products.filter(
                product =>

                    product.name
                    .toLowerCase()
                    .includes(text)

                    ||

                    product.category
                    .toLowerCase()
                    .includes(text)
            );


        displayProducts(filtered);

    }
);


/* =====================================
   LOW STOCK
===================================== */

function displayLowStock() {

    let container =
        document.getElementById(
            "lowStockList"
        );


    let lowProducts =
        products.filter(
            product =>
                product.quantity <=
                product.minimum
        );


    if (lowProducts.length === 0) {

        container.innerHTML = `
    < p style = "color:green" >
                ✅ All products have enough stock.
            </p >
    `;

        return;
    }


    container.innerHTML = "";


    lowProducts.forEach(product => {

        container.innerHTML += `

    < div class="low-product" >

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ⚠️
                    ${product.quantity}
                    ${product.unit}
                    remaining
                </span>

            </div >

    `;

    });

}


/* =====================================
   DATE
===================================== */

function showDate() {

    let today =
        new Date();


    document.getElementById(
        "date"
    ).innerText =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


/* =====================================
   START WEBSITE
===================================== */

showDate();

displayProducts();

updateDashboard();
