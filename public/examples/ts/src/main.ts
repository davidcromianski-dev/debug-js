import TypeScriptIsCool from './OtherFile.js';
import SomethingIsAboutToHappen from './MyCLass.js';

/**
 * This is a comment but it may not be useful. USe it at your own risk.
 * @param num {string|number|object|Array|[{string:number|object}]}
 * @param num2 {any}
 */
function tsExample(num: any = 0, num2: any = 0) {
    const ohYeah = new TypeScriptIsCool();
    const iDontKnowWhatThisDoes = (new TypeScriptIsCool()).doSomething();
    (new TypeScriptIsCool()).thisIsAFunction();
    // @ts-ignore
    const number = (new SomethingIsAboutToHappen()).myMethod(num) * ((iDontKnowWhatThisDoes * -2 / -4) - iDontKnowWhatThisDoes / 2 + iDontKnowWhatThisDoes / iDontKnowWhatThisDoes);
    return ohYeah.executeSomeCode(number as any, num2 as any);
}

(window as any).tsExample = tsExample;
// @ts-ignore
document.getElementById('ts').addEventListener('click', (e) => document.getElementById('result').innerHTML = tsExample(document.getElementById('num1').value, document.getElementById('num2').value).toString());