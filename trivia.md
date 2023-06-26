1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

    - nulls, arrays, and functions return true as objects.
    - console.log((bar !== null) && (bar.constructor === Object));

2. What will the code below output to the console and why?

    (function(){
      var a = b = 3;
    })();

    console.log("a defined? " + (typeof a !== 'undefined'));
    console.log("b defined? " + (typeof b !== 'undefined'));

    - a defined? is false and b defined? is true.
    - var a = b = 3 is shorthand for var a = b and b = 3. b is not declared by var and thus is not scoped.
    - if use strict is on, the above function will cause a runtime error.

3. What will the code below output to the console and why?

    var myObject = {
      foo: "bar",
      func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
          console.log("inner func:  this.foo = " + this.foo);
          console.log("inner func:  self.foo = " + self.foo);
        }());
      }
    };
    myObject.func();

    - outer func:  this.foo = bar
    - outer func:  self.foo = bar
    - inner func:  this.foo = undefined
    - inner func:  self.foo = bar
    
    - In the outter function, this is scoped to the object, but not in the inner function.
    - In the inner function, var self is still scoped the same so it functions the same.

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
    - Used by JavaScript libraries and modules.
    - Used to avoid name clashes between files and libraries.

5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?
    - Makes debugging easier.
    - Prevents accidental global variables by disallowing variables to be used without first being declared.
    - Eliminates this coercion.
    - Throws error for duplicated named function arguments.
    - Makes eVal() safer.
    - Throws an error on the invalid usage of delete.

6. Consider the two functions below. Will they both return the same thing? Why or why not?

    function foo1()
    {
      return {
        bar: "hello"
      };
    }

    function foo2()
    {
      return
      {
        bar: "hello"
      };
    }

    - foo1 returns { bar: "hello}
    - foo2 returns undefined
    - JavaScript automatically places a ; at the end of the return of foo2, nullifying the return value.

7. What will the code below output? Explain your answer.

    console.log(0.1 + 0.2);
    console.log(0.1 + 0.2 == 0.3);

    - 0.300000000000000004
    - false
    - JavaScipt is not precise in calculating decimal point numbers.

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
    (function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
    })();

    - 1, 4, 3, 2
    - 1 and 4 execute immediately when called
    - 2 executes 1 second or 1000 timer clicks after it is called.
    - 3, despite being set to 0, executes on the next timer click, so it is treated like it is set to 1.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

    - function isPalindrome(str) {
    -   str = str.replace(/\W/g, '').toLowerCase();
    -   return (str == str.split('').reverse().join(''));
    - }

10. Write a sum method which will work properly when invoked using either syntax below.
    console.log(sum(2,3));   // Outputs 5
    console.log(sum(2)(3));  // Outputs 5

    - function sum(x, y) {
    -   if (y !== undefined) {
    -   return x + y;
    -   } else {
    -    return function(y) { return x + y; };
    -   }
    - }

11. Consider the following code snippet:

    for (var i = 0; i < 5; i++) {
      var btn = document.createElement('button');
      btn.appendChild(document.createTextNode('Button ' + i));
      btn.addEventListener('click', function(){ console.log(i); });
      document.body.appendChild(btn);
    }

    (a) What gets logged to the console when the user clicks on “Button 4” and why?

    - No matter what button is clicked, the answer is 5.
    - The loop is already completed.

    (b) Provide one or more alternate implementations that will work as expected.

    - for (let i = 0; i < 5; i++) {
    -   var btn = document.createElement('button');
    -   btn.appendChild(document.createTextNode('Button ' + i));
    -   btn.addEventListener('click', function(){ console.log(i); });
    -   document.body.appendChild(btn);
    - }

12. Assuming d is an “empty” object in scope, say:

    var d = {};
    …what is accomplished using the following code?

    [ 'zebra', 'horse' ].forEach(function(k) {
	  d[k] = undefined;
    });

    - var d is now {'zebra' : undefined, 'horse' : undefined}
    - it now has object keys.

13. What will the code below output to the console and why?

    var arr1 = "john".split('');
    var arr2 = arr1.reverse();
    var arr3 = "jones".split('');
    arr2.push(arr3);
    console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
    console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

    - "array 1: length=5 last=j,o,n,e,s"
    - "array 2: length=5 last=j,o,n,e,s"
    - calling reverse() creates a reference, not a copy of the array.
    - this means that arr2 is a reference to arr1.
    - arr2.push(arr3) therefore changes not only arr2, but also arr1.

14. What will the code below output to the console and why ?

    console.log(1 +  "2" + "2");
    console.log(1 +  +"2" + "2");
    console.log(1 +  -"1" + "2");
    console.log(+"1" +  "1" + "2");
    console.log( "A" - "B" + "2");
    console.log( "A" - "B" + 2);

    - "122"
    - "32"
    - "02"
    - "112"
    - "NaN2"
    - NaN

    - JavaScript is loosely typed, not strictly typed. This means it will automatically perform type conversion.
    - This works, until the final two console.logs as "A" and "B" cannot be converted into integers.

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this  and still retain the recursive pattern?

    var list = readHugeList();

    var nextListItem = function() {
      var item = list.pop();

      if (item) {
        // process the list item...
        nextListItem();
      }
    };

    var list = readHugeList();

    - var nextListItem = function() {
    -   var item = list.pop();

    -   if (item) {
    -       // process the list item...
    -       setTimeout( nextListItem, 0);
    -   }
    - };

16. What is a “closure” in JavaScript? Provide an example.

    - A closure is an inner function that has access to the variables in the outter function.

17. What would the following lines of code output to the console?

    console.log("0 || 1 = "+(0 || 1));
    console.log("1 || 2 = "+(1 || 2));
    console.log("0 && 1 = "+(0 && 1));
    console.log("1 && 2 = "+(1 && 2));

    - 0 || 1 = 1
        - 0 is falsy and 1 is truthy
    - 1 || 2 = 1
        - both 1 and 2 are truthy, but items are evaluated from left to right, so 1 is first
    - 0 && 1 = 0
        - when the first operand is falsy, && returns it. 
    - 1 && 2 = 2
        - when the first operand is truthy, && returns the 2nd operand.

18. What will be the output when the following code is executed? Explain.

    console.log(false == '0')
    console.log(false === '0')

    - true
        - the double operand uses type coercion to convert both values to a number.
    - false
        - the triple operand uses strict equality. false is falsy, but any string, even '0' is truthy.

19. What is the output out of the following code? Explain your answer.

    var a={},
      b={key:'b'},
      c={key:'c'};

    a[b]=123;
    a[c]=456;

    console.log(a[b]);

    - 456
    - object keys can only be strings.
    - when a non-string like b or c is input, it changes to "[object Object]".
    - a[b] is therefore, a["[object Object]"]
    - a[c] is therefore also, a["[object Object]"]
    - since a[c] was the last value put in, a["[object Object]"] changed from 123 to 456.

20. What will the following code output to the console:

    console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));

    - 3628800
    - f(1): returns n, which is 1
    - f(2): returns 2 * f(1), which is 2
    - f(3): returns 3 * f(2), which is 6
    - f(4): returns 4 * f(3), which is 24
    - f(5): returns 5 * f(4), which is 120
    - f(6): returns 6 * f(5), which is 720
    - f(7): returns 7 * f(6), which is 5040
    - f(8): returns 8 * f(7), which is 40320
    - f(9): returns 9 * f(8), which is 362880
    - f(10): returns 10 * f(9), which is 3628800

21. Consider the code snippet below. What will the console output be and why?

    (function(x) {
      return (function(y) {
        console.log(x);
      })(2)
    })(1);

    - 1
    - the inner function has access to the variables in the outter function.

22. What will the following code output to the console and why:

    var hero = {
      _name: 'John Doe',
      getSecretIdentity: function (){
        return this._name;
      }
    };

    var stoleSecretIdentity = hero.getSecretIdentity;

    console.log(stoleSecretIdentity());
    console.log(hero.getSecretIdentity());

    - undefined
    - John Doe
    - stoleSecretIdentity is being invoked globally, but _name is not globally scoped.
    - Fix below...
    - var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

    The arguments to the function should be:

    a DOM element
    a callback function (that takes a DOM element as its argument)

    - function Traverse(p_element,p_callback) {
    -   p_callback(p_element);
    -   var list = p_element.children;
    -   for (var i = 0; i < list.length; i++) {
    -     Traverse(list[i],p_callback);  // recursive call
    -   }
    - }

24. Testing your this knowledge in JavaScript: What is the output of the following code?

    var length = 10;
    function fn() {
	  console.log(this.length);
    }

    var obj = {
       length: 5,
       method: function(fn) {
         fn();
         arguments[0]();
       }
    };

    obj.method(fn, 1);

    - 10
    - 2
    - In the first place, as fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. It also can be accessed as window.length or length or this.length (when this === window.)

    - method is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two parameters; the first is a function callback and other is just a number.

    - When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not length = 5 as defined in Object obj.

    - Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.

    - Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.

    - Hence the output will be as above.

25. Consider the following code. What will the output be, and why?

    (function () {
      try {
        throw new Error();
      } catch (x) {
        var x = 1, y = 2;
        console.log(x);
      }
      console.log(x);
      console.log(y);
    })();

    - 1
    - undefined
    - 2

    - var x is block scoped, but y is not. So x can be read inside the catch, but y can be read anywhere.

26. What will be the output of this code?

    var x = 21;
    var girl = function () {
      console.log(x);
      var x = 20;
    };
    girl ();

    - undefined
    - when var girl is hoisted, it checks that there is a local var x, so it doesn't use the global x.
    - because the local var x has yet to be declared, it logs undefined.

27. What will this code print?

    for (let i = 0; i < 5; i++) {
      setTimeout(function() { console.log(i); }, i * 1000 );
    }

    - 0, 1, 2, 3, 4
    - because unlike var, let is block scoped.

28. What do the following lines output, and why?

    console.log(1 < 2 < 3);
    console.log(3 > 2 > 1);

    - true
    - false
    - 1 < 2 which is true, true converts to 1, 1 < 3 which is true
    - 3 > 2 which is true, true converts to 1, 1 > 3 which is false

29. How do you add an element at the begining of an array? How do you add one at the end?

    - array.push()
    - array.unshift()
    - array = [..., 'end']
    - array = ['start', ...]

30. Imagine you have this code:

    var a = [1, 2, 3];

    a) Will this result in a crash?
      a[10] = 99;

      - no, javascript will make empty slots in indexes 3-9.

    b) What will this output?
      console.log(a[6]);

      - undefined.

31. What is the value of typeof undefined == typeof NULL?

    - true, both are undefined.

32. What would following code return?

    console.log(typeof typeof 1);

    - string
    - typeof 1 is number, but typeof number is a string.

33. What will be the output of the following code:

    for (var i = 0; i < 5; i++) {
	  setTimeout(function() { console.log(i); }, i * 1000 );
}
    Explain your answer. How could the use of closures help here?
    
    - 5,5,5,5,5
    - each function executes after the loop is completed.
    - To solve with closures...
    - for (var i = 0; i < 5; i++) {
    -   (function(x) {
    -      setTimeout(function() { console.log(x); }, x * 1000 );
    -   })(i);
    - }
    - But an easier way to solve it is...
    - for (let i = 0; i < 5; i++) {
	-   setTimeout(function() { console.log(i); }, i * 1000 );
    - }

34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

    - Not A Number
    - A tricky part of NaN is that it's classified as a number, so Typeof NaN === number
    - Strangely, NaN === NaN returns false.
    - Even isNaN() fails to be reliable.
    - The best test is value !== value, which is only true if value is NaN.

35. What will the following code output and why?

    var b = 1;
    function outer(){
   	  var b = 2
      function inner(){
        b++;
        var b = 3;
        console.log(b)
      }
      inner();
    }
    outer();

    - 3
    - variables are prioritized from local to global.
    - var b = 3 is the most local version of var b, so it is what the console.log uses.

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

    - function isInteger(x) { return (x ^ 0) === x; }
    - The XOR operator ('^') removes the decimals numbers from x.
    - If after removing the decimals, x is the same value, then x has no decimals.
    - function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
    - An integer is a type of number, but it is a number with no decimals.
    - If a number is evenly divisable by 1, then it is an integer.

37. How do you clone an object?

    - use Object.assign().