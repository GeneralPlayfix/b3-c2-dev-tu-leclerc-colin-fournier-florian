const assert = require('assert');
const evaluate = require('./utils');

describe('evaluate.customEval', function() {
  it('should evaluate simple arithmetic expressions', function() {
    assert.strictEqual(evaluate.customEval('2+3'), 5);
    assert.strictEqual(evaluate.customEval('2-3'), -1);
    assert.strictEqual(evaluate.customEval('2*3'), 6);
    assert.strictEqual(evaluate.customEval('6/3'), 2);
    assert.strictEqual(evaluate.customEval('7%4'), 3);
  });

  it('should handle parentheses', function() {
    assert.strictEqual(evaluate.customEval('(2+3)*4'), 20);
    assert.strictEqual(evaluate.customEval('5/2'), 2.5);
  });

  it('should handle negative numbers', function() {
    assert.strictEqual(evaluate.customEval('-2+3'), 1);
    assert.strictEqual(evaluate.customEval('2*-3'), -6);
    assert.strictEqual(evaluate.customEval('(-2+3)*(-4)'), -4);
  });

  it('should throw errors for invalid syntax', function() {
    assert.throws(() => evaluate.customEval('2+3)'), /Mismatched parentheses/);
    assert.throws(() => evaluate.customEval('2/0'), /Division by zero/);
    assert.throws(() => { evaluate.customEval("(1+2"); }, Error, "Mismatched parentheses");
    assert.throws(() => { evaluate.customEval("1 / 0"); }, Error, "Division by zero");
    assert.throws(() => { evaluate.customEval("1 % 0"); }, Error, "Modulo by zero");
    assert.throws(() => evaluate.customEval('(2+3'), /Mismatched parentheses/);
  });


    it('should handle square root', function() {
    assert.strictEqual(evaluate.customEval('sqrt(4)'), 2.0000000000001137);
    assert.strictEqual(evaluate.customEval('sqrt(16/4)'), 2.0000000000001137);
    assert.throws(() => evaluate.customEval('sqrt(-4)'), /negative number/);
    assert.throws(() => evaluate.customEval('sqrt(4/0)'), /Division by zero/);
    });
    
    it('should handle power', function() {
    assert.strictEqual(evaluate.customEval('2^3'), 8);
    assert.strictEqual(evaluate.customEval('(2+3)^2'), 25);
    assert.strictEqual(evaluate.customEval('3^(1+1)'), 9);
    assert.throws(() => evaluate.customEval('2^-3'), /Invalid syntax/);
    assert.throws(() => evaluate.customEval('(2/0)^2'), /Division by zero/);
    });
  
});