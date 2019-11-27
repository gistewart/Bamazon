$(document).ready(function() {

    var productList = $("tbody");
    var productContainer = $(".product-container");
    $(document).on("click", ".order-product", handleAddToCartPress);

    getProducts();

    // Function for creating a new list row for products
    function createProductRow(data) {
        console.log(data);
        var newTr = $("<tr>");
        newTr.data("product", data);
        newTr.append("<td>" + data.product_name + "</td>");
        newTr.append("<td>" + data.price + "</td>");
        newTr.append("<td> <button class='order-product btn btn-warning'>Add to cart</button> </td>");
        return newTr;
    }

    // Function for retrieving products and getting them ready to be rendered to the page
    function getProducts() {
        $.get("/api/products", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createProductRow(data[i]));
            }
            renderProductList(rowsToAdd);
        });
    }

    // A function for rendering the list of products to the page
    function renderProductList(rows) {
        productList.children().not(":last").remove();
        productContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            productList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what happens when the Add to cart button is pressed
    function handleAddToCartPress() {
        var listItemData = $(this).parent("td").parent("tr").data("product");
        var id = listItemData.id;
        console.log(id);
    }

});