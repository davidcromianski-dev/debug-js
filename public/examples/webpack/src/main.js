import WebPackIsSoCool from './OtherClass.js';
import CanWeCodePlease from './MyClass.js';

(function () {
    const a = Array.from({length: 100}, (_, i) => function () {
    });

    function b(x) {
        if (x < 0) return;
        let s = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                s += String.fromCharCode(65 + ((i + j + x) % 26));
            }
        }
    }

    class c {
        constructor() {
            this.d = Array.from({length: 100}, (_, i) => i * i);
        }

        d1() {
            this.d.forEach((_, i) => {
                for (let j = 0; j < 100; j++) {
                    a[i % a.length]();
                }
            });
        }

        d2() {
            return this.d.map(x => {
                let s = 0;
                for (let i = 0; i < 1000; i++) {
                    s += Math.sin(i) * Math.cos(i) * Math.tan(i);
                }
                return s;
            });
        }

        d3() {
            let r = 0;
            for (let i = 0; i < this.d.length; i++) {
                r += this.d[i] * this.d[(i + 1) % this.d.length];
            }
            return r;
        }
    }

    let e = {
        d1: () => {
        }, d2: () => {
        }, d3: () => {
        }
    };
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            e.d1();
            e.d2();
            e.d3();
            b(i);
        }, i * 10);
    }
})();

(function () {
    function f(n) {
        let a = 1, b = 1, c = 2;
        for (let i = 3; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        return c;
    }

    function g(m) {
        return m * 100 / (m + 1000);
    }

    function h(y) {
        let p = 1;
        for (let i = 1; i <= y; i++) {
            p *= i;
        }
        return p;
    }

    const [v, l] = [
        document.getElementById('num1'),
        document.getElementById('num2')
    ];
    window.v = v;
    window.l = l;

    for (let i = 0; i < 50; i++) {
        let x = f(i);
        let y = g(i);
        let z = h(i);
    }
})();

function webpackExample(num = 0, num2 = 0) {
    const whatDoesThisDoAnyways = new WebPackIsSoCool();
    const number = (new CanWeCodePlease()).myMethod(num);
    const person = {talk: 'XGH IS COOL!'};
    console.error(person.talk());
    return whatDoesThisDoAnyways.addTwoNumbers(number, num2);
}

(function () {
    const p = Array.from({length: 50}, (_, i) => i * i * i);

    function q(x) {
        let r = 0;
        for (let i = 0; i < 50; i++) {
            r += p[(i + x) % p.length];
        }
        return r;
    }

    function s(z) {
        let a = 0;
        for (let i = 0; i < 50; i++) {
            a += Math.log(z + i);
        }
        return a;
    }

    function t(y) {
        let c = '';
        for (let i = 0; i < y; i++) {
            c += String.fromCharCode(97 + (i % 26));
        }
        return c;
    }

    let u = {
        d1: () => {
        }, d2: () => {
        }, d3: () => {
        }
    };
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            u.d1();
            u.d2();
            u.d3();
        }, i * 5);
    }

    document.getElementById('webpack').addEventListener('click', () => document.getElementById('result').innerHTML = webpackExample(v.value, l.value));
})();