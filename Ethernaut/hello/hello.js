// === OPTIONAL ===

contract.info() 
// > "You will find what you need in info1()."

contract.info1()
// > "Try info2(), but with \"hello\" as a parameter."

contract.info2("hello")
// > "The property infoNum holds the number of the next info method to call."

contract.infoNum() 
/*
    {
    "negative": 0,
    "words": [
        42,
        null
    ],
    "length": 1,
    "red": null
    }
*/

contract.info42("hello")
// > "theMethodName is the name of the next method."

contract.theMethodName() 
// > "The method name is method7123949."

contract.method7123949()
// > "If you know the password, submit it to authenticate()."

contract.password()
// > "ethernaut0"

// === REQUIRED ===

contract.authenticate("ethernaut0") 