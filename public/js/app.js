$(document).ready(function() {
  var productList = $(".product-container tbody");
  var productContainer = $(".product-container");

  //Event listeners
  $(document).on("click", "#start-shopping", getProducts);
  $(document).on("click", ".order-product", handleAddToCartPress);
  $(document).on("click", "#view-cart", viewCart);
  $(document).on("click", "#place-order", placeOrder);
  $(document).on("click", "#continue-shopping", continueShopping);

  //On page load
  $(".product-header-container").hide();
  $(".product-container").hide();
  $(".view-cart-button-container").hide();
  $(".cart-header-container").hide();
  $(".cart-container").hide();
  $(".place-order-container").hide();
  $(".continue-shopping-container").hide();

  function getProducts() {
    $(".welcome-message-container").hide();
    $(".view-cart-button-container").hide();
    $(".product-header-container").show();
    $(".product-container").show();
    $(".cart-header-container").hide();
    $(".cart-container").hide();
    $(".continue-shopping-container").hide();

    $.get("/api/products", function(data) {
      console.log(data);
      $("#product-list").empty();
      for (var i = 0; i < data.length; i++) {
        var dataPrice = data[i].price;
        dataPrice = dataPrice.toLocaleString("us-US", {
          style: "currency",
          currency: "USD"
        });
        $("#product-list").prepend(
          "<tr><td>" +
            data[i].product_name +
            "</td><td class='productPrice'>" +
            dataPrice +
            "</td><td><button class='order-product btn btn-warning btn-sm' product-id='" +
            data[i].id +
            "' name-id='" +
            data[i].product_name +
            "' price-id1='" +
            data[i].price +
            "' price-id2='" +
            dataPrice +
            "' stock-quantity='" +
            data[i].stock_quantity +
            "'>Add to cart</button></td><tr>"
        );
      }
    });
  }

  // Function for handling what happens when the "Add to cart" button is pressed
  function handleAddToCartPress() {
    productID = $(this).attr("product-id");
    console.log("cart item id: " + productID);

    productName = $(this).attr("name-id");
    console.log("cart product name: " + productName);
    $("#productSelected").text(productName);

    productPrice1 = $(this).attr("price-id1");
    console.log("unformatted price: " + productPrice1);

    productPrice2 = $(this).attr("price-id2");
    console.log("formatted price: " + productPrice2);

    $("#productPrice").text(productPrice2);

    stockQuantity = $(this).attr("stock-quantity");
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
  let totalOrderCost1 = 0;
  var updating = false;

  //Function for handling what happens when "Place Order" button is pressed
  function placeOrder() {
    quantityRequested = parseInt($("#quantity-requested").val());
    console.log("quantity requested: " + quantityRequested);
    if (stockQuantity < quantityRequested) {
      console.log("not enough stock");
      showModalNotOkay();
    } else {
      totalOrderCost1 = productPrice1 * quantityRequested;
      totalOrderCost2 = totalOrderCost1.toLocaleString("us-US", {
        style: "currency",
        currency: "USD"
      });

      $("#orderCost").text(totalOrderCost2);
      console.log("order fulfilled");

      updating = true;

      updateQuantity();
      showModalOkay();
    }
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
    getProducts();
  }

  function updateQuantity() {
    if (updating) {
      console.log("Stock quantity: " + stockQuantity);
      let newStockQuantity = stockQuantity - quantityRequested;
      console.log("Remaining stock: " + newStockQuantity);

      let updatedProduct = {
        id: productID,
        stock_quantity: newStockQuantity
      };
      console.log(updatedProduct);
      updateDB(updatedProduct).then(function(res) {});
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
