$(document).ready(function() {
  var productList = $(".product-container tbody");
  var productContainer = $(".product-container");

  //Event listeners
  //   $(document).on("click", "#start-shopping", getProducts);
  $(document).on("click", ".order-product", handleAddToCartPress);
  $(document).on("click", "#view-cart", viewCart);
  $(document).on("click", "#place-order", placeOrder);
  $(document).on("click", "#continue-shopping", continueShopping);

  //On page load
  //   $(".product-header-container").hide();
  //   $(".view-cart-button-container").hide();
  //   $(".cart-header-container").hide();
  //   $(".cart-container").hide();
  //   $(".place-order-container").hide();
  //   $(".continue-shopping-container").hide();

  getProducts();

  // Function for creating a new list row for products
  function createProductRow(data) {
    console.log(data);
    var newTr = $("<tr>");
    newTr.data("product", data);
    newTr.append("<td>" + data.product_name + "</td>");

    //to format price to currency
    var dataPrice = data.price;
    dataPrice = dataPrice.toLocaleString("us-US", {
      style: "currency",
      currency: "USD"
    });
    newTr.append("<td class='productPrice'>" + dataPrice + "</td>");

    newTr.append(
      "<td> <button class='order-product btn btn-warning btn-sm' >Add to cart</button></td>"
    );

    return newTr;
  }

  // Function for retrieving products and getting them ready to be rendered to the page
  function getProducts() {
    $.get("/api/products", function(data) {
      console.log(data);
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createProductRow(data[i]));
      }
      renderProductList(rowsToAdd);
    });
  }

  // function for rendering the list of products to the page
  function renderProductList(rows) {
    productList
      .children()
      .not(":last")
      .remove();
    productContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      productList.prepend(rows);
    } else {
      renderEmpty();
    }
    $(".view-cart-button-container").hide();
    $(".cart-header-container").hide();
    $(".cart-container").hide();
    $(".place-order-container").hide();
    $(".continue-shopping-container").hide();
  }

  function renderEmpty() {}

  let productID;
  // let productPrice;

  // Function for handling what happens when the "Add to cart" button is pressed
  function handleAddToCartPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("product");
    productID = listItemData.id;
    console.log("cart item id: " + productID);

    productName = listItemData.product_name;
    console.log("cart product name: " + productName);
    $("#productSelected").text(productName);

    productPrice1 = listItemData.price;
    productPrice2 = productPrice1.toLocaleString("us-US", {
      style: "currency",
      currency: "USD"
    });
    console.log("cart item price: " + productPrice2);
    $("#productPrice").text(productPrice2);

    stockQuantity = listItemData.stock_quantity;
    console.log("stock quantity: " + stockQuantity);

    $(".view-cart-button-container").show();
  }

  //Function for handling what happens when "View Cart Details" button is pressed
  function viewCart() {
    $(".product-header-container").hide();
    $(".product-container").hide();
    $(".view-cart-button-container").hide();
    $(".cart-header-container").show();
    $(".cart-container").show();
    $(".place-order-container").show();
  }

  let quantityRequested = 0;
  let totalOrderCost = 0;
  var updating = false;

  //Function for handling what happens when "Place Order" button is pressed
  function placeOrder() {
    // console.log("stock quantity: " + stockQuantity);

    quantityRequested = $("#quantity-requested").val();
    console.log("quantity requested: " + quantityRequested);

    if (stockQuantity < quantityRequested) {
      console.log("not enough stock");
      showModalNotOkay();
    } else {
      // console.log("Product Price: " + productPrice1);

      totalOrderCost1 = productPrice1 * quantityRequested;
      console.log("Order cost: " + totalOrderCost1);
      totalOrderCost2 = totalOrderCost1.toLocaleString("us-US", {
        style: "currency",
        currency: "USD"
      });

      $("#orderCost").text(totalOrderCost2);
      console.log("order fulfilled");

      updating = true;
      // console.log(updating);
      updateQuantity();
      showModalOkay();
    }
    // continueShopping();
  }

  function showModalOkay() {
    $("#modalOkay").modal("show");
  }

  function showModalNotOkay() {
    $("#modalNotOkay").modal("show");
  }

  $("#modalOkay").on("hide.bs.modal", function() {
    $(".place-order-container").hide();
    $(".continue-shopping-container").show();
  });

  $("#modalNotOkay").on("hide.bs.modal", function() {
    $(".place-order-container").hide();
    $(".continue-shopping-container").show();
  });

  //Function for handling what happens when "Continue Shopping" button is pressed
  function continueShopping() {
    location.reload();
  }

  function updateQuantity() {
    if (updating) {
      // console.log(quantityRequested);
      // console.log("Stock quantity: " + stockQuantity);
      let newStockQuantity = stockQuantity - quantityRequested;
      console.log("Remaining stock: " + newStockQuantity);

      let updatedProduct = {
        id: productID,
        stock_quantity: newStockQuantity
      };
      console.log(updatedProduct);
      updateDB(updatedProduct).then(function(res) {
        // console.log(res)
      });
    }
  }

  function updateDB(updatedProduct) {
    return $.ajax({
      method: "PUT",
      url: "/api/products",
      data: updatedProduct
    });
  }
});
