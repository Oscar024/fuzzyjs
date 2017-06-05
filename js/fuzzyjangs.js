var size = 100;

function linspace(x, start, end) {
  var i;
  for (i = 0; i < size; i++)
    x[i] = (i * end + (size - 1 - i) * start) / (size - 1);
  return;
}

function minimo(x) {
  var i;
  var min;

  min = x[0];
  for (i = 1; i < size; i++)
    if (x[i] < min)
      min = x[i];
  return (min);
}

function maximo(x) {
  var i;
  var max;
  max = x[0];
  for (i = 1; i < size; i++)
    if (x[i] > max)
      max = x[i];
  return (max);
}

function triangular(a, b, c, x) {
  var ux = 0;
  if (x <= a) {
    ux = 0;
  }
  if (x > a && x < b) {
    ux = (x - a) / (b - a);
  }
  if (x == b) {
    ux = 1;
  }
  if (x > b && x < c) {
    ux = (c - x) / (c - b);
  }
  return ux;
}


function tri_mf(t_value, x, a, b, c) {
  var i;
  var temp = new Array(size);
  for (i = 0; i < size; i++)
    temp[i] = x[i];
  for (i = 0; i < size; i++)
    t_value[i] = triangular(a, b, c, x[i]);

}

function trapezoidal(a, b, c, d, x) {
  var ux = 0;
  if (x <= a) {
    ux = 0;
  }
  if (x > a && x < b) {
    ux = (x - a) / (b - a);
  }
  if (x >= b && x <= c) {
    ux = 1;
  }
  if (x > c && x < d) {
    ux = (d - x) / (d - c);
  }
  if (x > d) {
    ux = 0;
  }
  return ux;
}



function trap_mf(t_value, x, a, b, c, d) {
  var i;
  var temp = new Array(size);

  for (i = 0; i < size; i++)
    temp[i] = x[i];
  for (i = 0; i < size; i++)
    t_value[i] = trapezoidal(a, b, c, d, x[i]);
  //printArray(t_value,size);
}

function qualified(y, x, w) {
  var min;
  var i;
  min = w;
  for (i = 0; i < size; i++) {
    if (x[i] < w)
      y[i] = x[i];
    else
      y[i] = w;
  }

  return;
}

function out_mf(result, x, y, z) {
  var i;
  for (i = 0; i < size; i++) {
    if (x[i] > y[i] && x[i] > z[i]) {
      //printf("El numero mayor es %d",A);
      result[i] = x[i];
    } else {
      if (y[i] > x[i] && y[i] > z[i]) {
        //printf("El numero mayor es %d",B);
        result[i] = y[i];
      } else {
        //printf("El numero mayor es %d",C);
        result[i] = z[i];
      }
    }
  }
}

function defuzzy(x, mf) {
  var sum1 = 0,sum2 = 0,out = 0;
  var i;
  for (i = 0; i < size; i++)
    sum1 += x[i] * mf[i];
  for (i = 0; i < size; i++)
    sum2 += mf[i];
  out = sum1 / sum2;
  return out;
}

function fuzzy_system() {
  var w1, w2, w3;
  var output = new Array(size);
  var overall_out_mf = new Array(size);
  var qualified_cons_mf1 = new Array(size);
  var qualified_cons_mf2 = new Array(size)
  var qualified_cons_mf3 = new Array(size)
  var x = new Array(size);
  var y = new Array(size);
  var ante_mf3 = new Array(size);
  var cons_mf3 = new Array(size);
  var ante_mf2 = new Array(size);
  var cons_mf2 = new Array(size);
  var ante_mf1 = new Array(size);
  var cons_mf1 = new Array(size);
  var i;
  linspace(x, -10, 10, size);
  linspace(y, 0, 10, size);
  //printArray(x,size);
  //Funciones de membrecia de antecedente
  trap_mf(ante_mf1, x, -20, -15, -6, -3);
  trap_mf(ante_mf2, x, -6, -3, 3, 6);
  trap_mf(ante_mf3, x, 3, 6, 15, 20);

  //Funciones de membrecia de consecuente
  trap_mf(cons_mf1, y, -2.46, -1.46, 1.46, 2.46);
  trap_mf(cons_mf2, y, 1.46, 2.46, 5, 7);
  trap_mf(cons_mf3, y, 5, 7, 13, 15);

  //Fuzzy inference system
  for (i = 0; i < size; i++) {
    w1 = trapezoidal(-20, -15, -6, -3, x[i]);
    w2 = trapezoidal(-6, -3, 3, 6, x[i]);
    w3 = trapezoidal(3, 6, 15, 20, x[i]);
    qualified(qualified_cons_mf1, cons_mf1, w1);
    qualified(qualified_cons_mf2, cons_mf2, w2);
    qualified(qualified_cons_mf3, cons_mf3, w3);
    out_mf(overall_out_mf, qualified_cons_mf1, qualified_cons_mf2, qualified_cons_mf3);
    output[i] = defuzzy(y, overall_out_mf);
  }
}

function fuzzy_system_single1(input) {
  var w1, w2, w3;
  var output = new Array(size);
  var overall_out_mf = new Array(size);
  var qualified_cons_mf1 = new Array(size);
  var qualified_cons_mf2 = new Array(size)
  var qualified_cons_mf3 = new Array(size)
  var x = new Array(size);
  var y = new Array(size);
  var ante_mf3 = new Array(size);
  var cons_mf3 = new Array(size);
  var ante_mf2 = new Array(size);
  var cons_mf2 = new Array(size);
  var ante_mf1 = new Array(size);
  var cons_mf1 = new Array(size);
  var i;
  linspace(x, 0, 100, size);
  linspace(y, 0, 100, size);
  //printArray(x,size);
  //Funciones de membrecia de antecedente
  tri_mf(ante_mf1, x, -4, 0, 4);
  tri_mf(ante_mf2, x, 1, 5, 9);
  tri_mf(ante_mf3, x, 6, 10, 14);

  //Funciones de membrecia de consecuente
  tri_mf(cons_mf1, y, -40, 0, 40);
  tri_mf(cons_mf2, y, 10, 50, 90);
  tri_mf(cons_mf3, y, 60, 100, 140);

  //Fuzzy inference system
  //for(i=0;i<size;i++){
  w1 = triangular(-4,0,4, input);
  w2 = triangular(1,5,9, input);
  w3 = triangular(6,10,14, input);
  //If error es bajo then w1 es rápido
  qualified(qualified_cons_mf1, cons_mf3, w1);
  //If error es medio then w1 es regular
  qualified(qualified_cons_mf2, cons_mf2, w2);
  //If error es alto then w1 es rápido
  qualified(qualified_cons_mf3, cons_mf3, w3);
  out_mf(overall_out_mf, qualified_cons_mf1, qualified_cons_mf2, qualified_cons_mf3);
  output = defuzzy(y, overall_out_mf);
  return output;
  //}
}

function fuzzy_system_single2(input) {
  var w1, w2, w3;
  var output = new Array(size);
  var overall_out_mf = new Array(size);
  var qualified_cons_mf1 = new Array(size);
  var qualified_cons_mf2 = new Array(size)
  var qualified_cons_mf3 = new Array(size)
  var x = new Array(size);
  var y = new Array(size);
  var ante_mf3 = new Array(size);
  var cons_mf3 = new Array(size);
  var ante_mf2 = new Array(size);
  var cons_mf2 = new Array(size);
  var ante_mf1 = new Array(size);
  var cons_mf1 = new Array(size);
  var i;
  linspace(x, 0, 100, size);
  linspace(y, 0, 100, size);
  //printArray(x,size);
  //Funciones de membrecia de antecedente
  tri_mf(ante_mf1, x, -4, 0, 4);
  tri_mf(ante_mf2, x, 1, 5, 9);
  tri_mf(ante_mf3, x, 6, 10, 14);

  //Funciones de membrecia de consecuente
  tri_mf(cons_mf1, y, -40, 0, 40);
  tri_mf(cons_mf2, y, 10, 50, 90);
  tri_mf(cons_mf3, y, 60, 100, 140);

  //Fuzzy inference system
  //for(i=0;i<size;i++){
  w1 = triangular(-4,0,4, input);
  w2 = triangular(1,5,9, input);
  w3 = triangular(6,10,14, input);
  //If error es bajo then w2 es rápido
  qualified(qualified_cons_mf1, cons_mf3, w1);
  //If error es medio then w2 es rápido
  qualified(qualified_cons_mf2, cons_mf3, w2);
  //If error es alto then w2 es regular
  qualified(qualified_cons_mf3, cons_mf2, w3);
  out_mf(overall_out_mf, qualified_cons_mf1, qualified_cons_mf2, qualified_cons_mf3);
  output = defuzzy(y, overall_out_mf);
  return output;
  //}
}
