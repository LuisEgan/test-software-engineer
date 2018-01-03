class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;

    this.MAX_PRICE = 50;
    this.MC_PRICE = 80;

    this.COVERAGES = {
      FC: 'Full Coverage',
      SFC: 'Special Full Coverage',
      MC: 'Mega Coverage',
      SS: 'Super Sale'
    };
  }
  
  updatePrice() {
    const { products, COVERAGES, MAX_PRICE, MC_PRICE } = this;

    products.forEach( product => {
      let { name } = product;

      const isFC = name === COVERAGES.FC;
      const isSFC = name === COVERAGES.SFC;
      const isMC = name === COVERAGES.MC;
      const isSS = name === COVERAGES.SS;

      // If the product is not a Full coverage type
      if (!isFC && !isSFC) {
        if (product.price > 0) {
          if (!isMC) {
            product.price -= 1;
            (isSS) && (product.price -= 1);
          }
        }
      } else {
        if (product.price < MAX_PRICE) {
          product.price += 1;
          if (isSFC) {
            if (product.sellIn < 11) {
              (product.price < MAX_PRICE) && (product.price += 1);
            }
            if (product.sellIn < 6) {
              (product.price < MAX_PRICE) && (product.price += 1);
            }
          }
        }
      }

      // Decrease sellIn for all products, except for the MC ones.
      if (!isMC) {
        product.sellIn -= 1;
      }

      if (product.sellIn < 0) {
        if (!isFC) {
          if (!isSFC) {
            // If the product is MC or SS
            if (product.price > 0) {
              if (!isMC) {
                product.price -= 1;
                (isSS) && (product.price -= 1);
              }
            }
          } else {
            product.price = 0;
          }
        } else {
          (product.price < MAX_PRICE) && (product.price += 1);
        }
      }

      // Fallback for MC to ensure its price is always MC_PRICE
      if (isMC) {
        product.price = MC_PRICE;
      }
    });

    return products;
  }
}

module.exports = {
  Product,
  CarInsurance
}