const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  it("Day 0 to 1", function() {
    // Products at day 0
    const productsAtDayZero = [
      new Product('Medium Coverage', 10, 20),
      new Product('Full Coverage', 2, 0),
      new Product('Low Coverage', 5, 7),
      new Product('Mega Coverage', 0, 80),
      new Product('Mega Coverage', -1, 80),
      new Product('Special Full Coverage', 15, 20),
      new Product('Special Full Coverage', 10, 49),
      new Product('Special Full Coverage', 3, 49),
      new Product('Special Full Coverage', 2, 48),
      new Product('Super Sale', 3, 6),
    ];

    // All sellIns at day 1
    const sellInArr = [9,1,4,0,-1,14,9,2,1,2];

    // All prices at day 1
    const priceArr = [19,1,6,80,80,21,50,50,50,4];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });
  });

  // All with expired sellIns
  it("Expired sellIns", () => {
    // Products at day 0 with expired coverage
    const productsAtDayZero = [
      new Product('Low Coverage', -1, 7),
      new Product('Medium Coverage', -1, 20),
      new Product('Full Coverage', -1, 0),
      new Product('Special Full Coverage', -1, 20),
      new Product('Super Sale', -1, 6),
      new Product('Mega Coverage', -1, 80),
    ];

    // All sellIns at day 1
    const sellInArr = [-2,-2,-2,-2,-2,-1];

    // All prices at day 1
    const priceArr = [5,18,2,0,2,80];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });

  });

  // Never more than 50
  it("Prices Max", () => {
    // Products that could increase price at day 0 with max price and random sellIns
    const productsAtDayZero = [
      new Product('Full Coverage', -1, 50),
      new Product('Special Full Coverage', 6, 50)
    ];

    // All sellIns at day 1
    const sellInArr = [-2,5];

    // All prices at day 1
    const priceArr = [50,50];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });

  });

  // Never below 0
  it("Prices Low", () => {
    // Products at day 0 with expired coverage
    const productsAtDayZero = [
      new Product('Low Coverage', 1, 0),
      new Product('Low Coverage', -1, 0),
      new Product('Medium Coverage', 1, 0),
      new Product('Medium Coverage', -1, 0),
      new Product('Super Sale', 1, 0),
      new Product('Super Sale', -1, 0),
    ];

    // All sellIns at day 1
    const sellInArr = [0,-2,0,-2,0,-2];

    // All prices at day 1
    const priceArr = [0,0,0,0,0,0];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });
  });

  // Mega Coverage won't mutate regardless of sellIn, and if price is incorrect, it'll get fixed
  it("Mega Coverage stays put", () => {
    // All Mega Coverage scenarios
    const productsAtDayZero = [
      new Product('Mega Coverage', -1, 80),
      new Product('Mega Coverage', 4, 80),
      new Product('Mega Coverage', 40, 80),
      new Product('Mega Coverage', -1, 30),
      new Product('Mega Coverage', 4, 64),
      new Product('Mega Coverage', 40, 1)
    ];

    // All sellIns at day 1
    const sellInArr = [-1,4,40,-1,4,40];

    // All prices at day 1
    const priceArr = [80,80,80,80,80,80];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });
  });

  // Full Coverage scenarios
  it("Full Coverage scenarios", () => {
    // Products at day 0 with Spec Co with and without max price
    const productsAtDayZero = [
      new Product('Full Coverage', 15, 20), //>10
      new Product('Full Coverage', 9, 20), //>5
      new Product('Full Coverage', 4, 20), //>0
      new Product('Full Coverage', -1, 20), //<0
      new Product('Full Coverage', 15, 50), //>10
      new Product('Full Coverage', 9, 50), //>5
      new Product('Full Coverage', 4, 50), //>0
      new Product('Full Coverage', -1, 50), //<0
    ];

    // All sellIns at day 1
    const sellInArr = [14,8,3,-2,14,8,3,-2];

    // All prices at day 1
    const priceArr = [21,21,21,22,50,50,50,50];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });
  });

  // Special Full Coverage scenarios
  it("Special Full Coverage scenarios", () => {
    // Products at day 0 with Spec Co with and without max price
    const productsAtDayZero = [
      new Product('Special Full Coverage', 15, 20), //>10
      new Product('Special Full Coverage', 9, 20), //>5
      new Product('Special Full Coverage', 4, 20), //>0
      new Product('Special Full Coverage', -1, 20), //<0
      new Product('Special Full Coverage', 15, 50), //>10
      new Product('Special Full Coverage', 9, 50), //>5
      new Product('Special Full Coverage', 4, 50), //>0
      new Product('Special Full Coverage', -1, 50), //<0
    ];

    // All sellIns at day 1
    const sellInArr = [14,8,3,-2,14,8,3,-2];

    // All prices at day 1
    const priceArr = [21,22,23,0,50,50,50,0];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });

  });

  // Super Sale scenarios
  it("Super Sale scenarios", () => {
    // Products at day 0 with expired coverage
    const productsAtDayZero = [
      new Product('Super Sale', 12, 6),
      new Product('Super Sale', 8, 3),
      new Product('Super Sale', 3, 6),
      new Product('Super Sale', 0, 2),
      new Product('Super Sale', -1, 4),
    ];

    // All sellIns at day 1
    const sellInArr = [11,7,2,-1,-2];

    // All prices at day 1
    const priceArr = [4,1,4,0,0];

    const coTest = new CarInsurance(productsAtDayZero);

    // Check if everything changes in 1 day as it should
    coTest.updatePrice().forEach( (product, i) => {
      expect(product.sellIn).equal(sellInArr[i]);
      expect(product.price).equal(priceArr[i]);
    });

  });
});
