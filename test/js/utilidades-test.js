var expect = chai.expect;
chai.should();

describe('Prueba de sumas básicas', () => {
  it('Prueba suma', () => {
    evaluar("2+3").should.equal(5);
  });
  it('Prueba suma muchos numeros', () => {
    evaluar("2+3+4+5+6+7+4+3").should.equal(34);
  });
  it('Prueba suma decimales', () => {
    evaluar("2+3.3+2.3+4.5").should.equal(12.1);
  });
});

describe('Prueba de restas básicas', () => {
  it('Prueba resta', () => {
    evaluar("123-54").should.equal(69);
  });
  it('Prueba resta muchos numeros ', () => {
    evaluar("154-96-85-66-3-7878").should.equal(-7974);
  });
  it('Prueba resta decimales', () => {
    evaluar("3.3-54.2-99.1-101.1-23").should.equal(-274.1);
  });
});

describe('Prueba de multiplicaciones básicas', () => {
  it('Prueba multiplicaciones', () => {
    evaluar("3*3").should.equal(9);
  });
  it('Prueba multiplicaciones muchos numeros', () => {
    evaluar("1*2*3*65*89*48*55*45").should.equal(4123548000);
  });
  it('Prueba multiplicaciones decimales', () => {
    evaluar("4.2*6.6*98.2").should.equal(2722.1);
  });
});

describe('Prueba de divisiones básicas', () => {
  it('Prueba divisiones ', () => {
    evaluar("123/54").should.equal(2.28);
  });
  it('Prueba divisiones muchos numeros', () => {
    evaluar("3/3/2/6/5/5").should.equal(0);
  });
  it('Prueba divisiones decimales', () => {
    evaluar("2.2/6.3/4.5").should.equal(0.08);
  });
});

describe('Prueba de sumas,restas,multiplicaciones y divisiones mezcladas', () => {
  it('Prueba básica ', () => {
    evaluar("6+9*2-3/2*5+9").should.equal(25.5);
  });
  it('Prueba muchos numeros', () => {
    evaluar("6+9*2-3/2*5+96+9*2-3/2*5+96+9*2-3/2*5+9").should.equal(238.5);
  });
  it('Prueba decimales', () => {
    evaluar("6+9*2.33-3/2*5+96.69+9*2-3/2*5+96+9*2.23-3/2*5.0095+9").should.equal(244.22);
  });
});

describe('Pruebas números pequeños', () => {
  it('Prueba precisión', () => {
      evaluar("3.000008+2.3333").should.equal(5.33);  });
  it('Prueba centesimas', () => {
      evaluar("0.00003*0.021").should.equal(0);  });
  it('Prueba negativo', () => {
      evaluar("-0.2/0.3").should.equal(-0.67);  });  
  
});

describe('Pruebas extrañas(inalcanzables de forma gráfica)', () => {
  it('Prueba 1', () => {
    evaluar("2++3**2").should.equal(0);  });
  it('Prueba 2', () => {
    evaluar("3+hola*2").should.equal(0);  });
  it('Prueba 3', () => {
    evaluar("69*6+++++2..3").should.equal(0);  });  
  it('Prueba 4', () => {
    evaluar("----56.23+96**5").should.equal(0);  });
  it('Prueba 4', () => {
    evaluar("---22.00+5+96**5+++").should.equal(0);  });
  it('Prueba 5', () => {
      evaluar("9999").should.equal("9999");  });
});



