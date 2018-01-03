const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  it("Coverage Report", function() {
    const productsArr = [
      new Product("Medium Coverage", 10, 20),
      new Product("Full Coverage", 2, 0),
      new Product("Low Coverage", 5, 7),
      new Product("Mega Coverage", 0, 80),
      new Product("Mega Coverage", -1, 80),
      new Product("Special Full Coverage", 15, 20),
      new Product("Special Full Coverage", 10, 49),
      new Product("Special Full Coverage", 5, 49),
      new Product("Super Sale", 3, 6)
    ];
    const sellInArr = [9,1,4,0,-1,14,9,4,2];
    const priceArr = [19,1,6,80,80,21,50,50,4];
    const coTest = new CarInsurance(productsArr);

    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });
  });
});
