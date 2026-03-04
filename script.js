// Ito ang function na ibinigay mo
function applyDiscount(originalPrice, discountValue, discountType = "percentage") {
  if (originalPrice < 0 || discountValue < 0) {
    console.error("Price and discount must be positive numbers.");
    return originalPrice; 
  }

  let finalPrice = originalPrice;

  if (discountType === "percentage") {
    if (discountValue > 100) discountValue = 100;
    const discountAmount = originalPrice * (discountValue / 100);
    finalPrice = originalPrice - discountAmount;
  } else if (discountType === "fixed") {
    finalPrice = originalPrice - discountValue;
    if (finalPrice < 0) finalPrice = 0; 
  }

  return parseFloat(finalPrice.toFixed(2));
}

// Ito ang na-update na computeTotal
function computeTotal() {
    let total = 0;
    const items = document.querySelectorAll('.item-qty');
    
    // Kunin ang total price ng mga inorder
    items.forEach(item => {
        const quantity = parseInt(item.value) || 0;
        const price = parseFloat(item.getAttribute('data-price'));
        total += quantity * price;
    });

    // Halimbawa: I-check natin kung may naka-check na "Senior Discount" checkbox sa HTML
    const seniorDiscountCheckbox = document.getElementById('senior-discount');
    
    // Kung may laman na ang total at naka-check ang discount box
    if (total > 0 && seniorDiscountCheckbox && seniorDiscountCheckbox.checked) {
        // I-apply ang 20% discount gamit ang function mo
        total = applyDiscount(total, 20, "percentage");
    }

    // I-display ang final price
    document.getElementById('total-price').innerText = total.toFixed(2);
}