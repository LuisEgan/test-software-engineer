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
  }
  updatePrice() {
    const { products } = this;
    
    const COVERAGES = {
      FC: 'Full Coverage',
      SFC: 'Special Full Coverage',
      MC: 'Mega Coverage',
      SS: 'Super Sale'
    }

    const MAX_PRICE = 50;
    const MC_PRICE = 80;

    products.forEach( product => {
      let { name, price, sellIn } = product;

      const isFC = name === COVERAGES.FC;
      const isSFC = name === COVERAGES.SFC;
      const isMC = name === COVERAGES.MC;
      const isSS = name === COVERAGES.SS;

      const atMaxPrice = price >= MAX_PRICE;

      // If the item is not a Full coverage type
      if (!isFC && !isSFC) {
        if (price > 0) {
          if (!isMC) {
            price -= 1;
          }
        }
      } else {
        if (!atMaxPrice) {
          price += 1;
          if (isSFC) {
            if (sellIn < 11) {
              (!atMaxPrice) && (price += 1);
            }
            if (sellIn < 6) {
              (!atMaxPrice) && (price += 1);
            }
          }
        }
      }

      // Decrease sellIn for all products, except for the MC ones.
      if (!isMC) {
        sellIn -= 1;
      }

      if (sellIn < 0) {
        if (!isFC) {
          if (!isSFC) {
            // If the product is MC or SS
            if (price > 0) {
              if (!isMC) {
                price -= 1;
                if(isSS) {
                  price -= 1;
                }
              }
            }
          } else {
            price = 0;
          }
        } else {
          (!atMaxPrice) && (price += 1);
        }
      }

      // Fallback for MC to ensure its price is always MC_PRICE
      if (isMC) {
        price = MC_PRICE;
      }
    });

    return products;
  }
}

module.exports = {
  Product,
  CarInsurance
}