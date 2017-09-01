/**
 * Recursive Memoization
 * O(n)
 */
function fibMem(n,a) {
  if(n <= 1) return n;
  if(typeof a === 'undefined') a = [];

  if(a[n] == null) {
    a[n] = fibMem(n-1, a) + fibMem(n-2, a);
  }
  return a[n];
}

/**
 * Recursion
 * O(2^n)
 */
function fibRec(n) {
  if(n <= 1) return n;

  return fibRec(n-1) + fibRec(n-2);
}

/**
 * Bottom-up Approach w/ For Loop
 * O(n) 
 */
function fibFor(n) {
    if (n <= 1) return n;

    var arr = [1, 1];
    for (var i = 3; i <= n; i++) {
        arr[i - 1] = arr[i - 2] + arr[i - 3];
    }

    return arr[n - 1];
}

/**
 * Bottom-up Approach w/ While Loop
 * O(n) 
 */
function fibWhile(n) {
    if (n <= 1) return n;

    var a = 0,
        b = 1,
        tmp;

    while (n > 0) {
        tmp = b;
        b = a + b;
        a = tmp;
        n--;
    }

    return a;
}

/**
 * Runs each of the functions and gets the duration of each 
 */
function getDurations(n) {
    var t = performance.now();
    var num = fibRec(n);
    var d1 = performance.now() - t;

    var t2 = performance.now();
    var num2 = fibMem(n);
    var d2 = performance.now() - t2;

    var t3 = performance.now();
    var num3 = fibFor(n);
    var d3 = performance.now() - t3;

    var t4 = performance.now();
    var num4 = fibWhile(n);
    var d4 = performance.now() - t4;

    if(num !== num2 || num !== num3 || num !== num4 ||
        num2 !== num3 || num2 !== num4 || num3 !== num4) {
        console.error("One of the algorithms is incorrect." +
            "\nfibRec  : " + num +
            "\nfibMem  : " + num2 +
            "\nfibFor  : " + num3 +
            "\nfibWhile: " + num4);
    }

    console.log("n=[" + n + 
        "]\n n=[" + num +
        "]\n fibRec  : " + d1 +
        "ms\n fibMem  : " + d2 +
        "ms\n fibFor  : " + d3 +
        "ms\n fibWhile: " + d4 + "ms");

    return {
        fibRec: d1,
        fibMem: d2,
        fibFor: d3,
        fibWhile: d4
    };
}

/**
 * Runs and creates the plot of runtime durations 
 */
function getDurationsVsTime(n) {
    var data = [];
    var layout = {
        title: 'Fibonnaci Runtime Comparison',
        xaxis: {
            title: 'nth Fibonnaci Number'
        },
        yaxis: {
            title: 'Time in Milliseconds'
        }
    };
    var fibRec = {
        x: [],
        y: [],
        name: 'fibRec'
    };
    var fibMem = {
        x: [],
        y: [],
        name: 'fibMem'
    };
    var fibFor = {
        x: [],
        y: [],
        name: 'fibFor'
    };
    var fibWhile = {
        x: [],
        y: [],
        name: 'fibWhile'
    };

    for (var i = 1; i <= n; i++) {
        fibRec.x[i] = i;
        fibMem.x[i] = i;
        fibFor.x[i] = i;
        fibWhile.x[i] = i;

        var data = getDurations(i);
        fibRec.y[i] = data.fibRec;
        fibMem.y[i] = data.fibMem;
        fibFor.y[i] = data.fibFor;
        fibWhile.y[i] = data.fibWhile;
    }

    data = [fibRec, fibMem, fibFor, fibWhile];

    Plotly.newPlot('algorithmVsTime', data, layout);
}

