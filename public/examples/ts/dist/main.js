import TypeScriptIsCool from './OtherFile.js';
import SomethingIsAboutToHappen from './MyCLass.js';
function tsExample(num = 0, num2 = 0) {
    const ohYeah = new TypeScriptIsCool();
    const iDontKnowWhatThisDoes = (new TypeScriptIsCool()).doSomething();
    (new TypeScriptIsCool()).thisIsAFunction();
    const number = (new SomethingIsAboutToHappen()).myMethod(num) * ((iDontKnowWhatThisDoes * -2 / -4) - iDontKnowWhatThisDoes / 2 + iDontKnowWhatThisDoes / iDontKnowWhatThisDoes);
    return ohYeah.executeSomeCode(number, num2);
}
window.tsExample = tsExample;
document.getElementById('ts').addEventListener('click', (e) => document.getElementById('result').innerHTML = tsExample(document.getElementById('num1').value, document.getElementById('num2').value).toString());
//# sourceMappingURL=main.js.map