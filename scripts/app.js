function sayHello(){
    console.log('Hello There');
    return;
}

function sayGoodbye()
{
    console.log('Goodbye');
}

function init(){
    console.log("hello world");
    sayHello();
    sayGoodbye();
}

window.onload = init; 
