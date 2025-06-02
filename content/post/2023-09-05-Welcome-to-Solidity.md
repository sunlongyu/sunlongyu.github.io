---
title:       "Welcome to Solidity"
subtitle:    "start to learn solidity"
description: ""
date:        2023-09-03
author:      "SLY"
image:       ""
tags:        ["solidity", "contract", "tool"]
categories:  ["BLOCKCHAIN" ]
---


## No.1 Solidity basic

Solidity是一种用于编写智能合约的编程语言。智能合约是在区块链平台上执行的自动化合约，它们定义了参与方之间的规则和条件，并确保这些规则在合约中被执行。

Solidity最初是为以太坊区块链平台设计的，但也被其他以太坊虚拟机（EVM）兼容的区块链平台广泛采用。它提供了一套丰富的库和功能，使开发者能够在智能合约中实现复杂的逻辑和业务流程。

使用Solidity编写的智能合约可以实现多种功能，包括创建和管理数字资产（如代币）、实施多方签名、执行投票和选举、创建去中心化应用程序（DApps）等。

### 1.first contract

一个合约通常由**状态变量（合约数据）**和**合约函数**组成。我们以最简单的Counter 计数器作为入门合约

#### 1）申明编译器版本

编写合约首先要做的是声明编译器版本， 告诉编译器使用什么版本的编译器来编译

```
pragma solidity >=0.8.0;  //使用大于等于0.8.0 版本的编译编译 Counter 合约
```

#### 2）定义合约

Solidity 使用 `contract` 定义合约，和其他语言的类（`class`）很类似，合约本身也是一个数据类型， 称为合约类型，除此之外合约还可以定义事件、自定义类型等。

```
contract Counter {   //定义了一个名为 Counter 的合约
}
```

#### 3）合约构造函数

构造函数是在创建合约时执行的一个特殊函数，用来初始化合约， `constructor` 关键字声明的一个构造函数。

如果没有初始化代码编译器会添加一个默认的构造函数`constructor() public {}`。

状态变量的初始化，也可以在声明时进行指定，未指定时，**默认为0。**

```
contract Base {
    uint x;
    address owner;
    constructor(uint _x) public {
       x = _x;
       owner = msg.sender;
    }
}
```

#### 4）定义变量

Solidity 是一个静态类型语言，在定义每个变量时需要声明该变量的类型，定义变量按格式： `变量类型` `变量可见性` `变量名`。变量可见性是可选的，没有显示申明可见性时，会使用缺省值 `internal`。

```
uint public counter;     //声明了一个变量名为 counter，类型为 uint（256位无符号整数）
```

合约中的变量会在区块链上分配一个存储单元。在以太坊中，所有的变量构成了整个区块链网络的状态，所以合约中变量通常称为**状态变量**。

但有两个特殊的“变量“， 他们不在链上分配存储单元：

#### ·常量

`constant` 用来声明一个常量，不占用合约的存储空间，在编译时使用对应的表达式值替换常量名，即使用`constant`修饰的状态变量，只能使用在编译时有确定值的表达式来给变量赋值。

```
contract C {
    uint constant x = 32**22 + 8;
    string constant text = "abc";
}
```

#### ·不可变量

不可变量在构造函数中进行赋值，构造函数是在部署的时候执行，因此这是运行时赋值。

Solidity 中使用 `immutable` 来定义一个不可变量，它不会占用状态变量存储空间，在部署时，变量的值会被追加的运行时字节码中，因此它比使用状态变量便宜的多，同样带来了更多的安全性（确保了这个值无法再修改），因此不可变量在很多时候非常有用，比如保存创建者地址、关联合约地址等。

```
contract Example {    
    uint immutable decimals;
    uint immutable maxBalance;
    constructor(uint _decimals, address _reference) public {
       decimals = _decimals;
       maxBalance = _reference.balance; 
    }

}
```

#### 5）定义函数

function关键字用来定于函数

```
  function count() public {   //名为 count() 函数，对counter状态变量加 1
        counter = counter + 1;
    }
```

由于状态变量的改变，因此调用这个函数会修改区块链状态，这时我们就需要[通过一个交易来调用该函数](https://decert.me/tutorial/solidity/tools/remix#调用合约函数)，调用者为交易提供 Gas，验证者（矿工）收取 Gas 打包交易，经过区块链共识后，`counter`变量才真正算完成加1 ；

我们还可以根据需要定义函数的参数与返回值以及指定该函数是否要修改状态，一个函数定义形式可以这样表示：

```
function 函数名(<参数类型> <参数名>) <可见性> <状态可变性> [returns(<返回类型>)]{ 
}
```

#### ·函数返回值

在Solidity 中，返回值与参数的处理方式是一样的，代码中 返回值 `result` 也称为输出参数，我们可以在函数体里直接为它赋值，或直接在 `return` 语句中提供返回，返回值可以仅指定其类型，省略名称：

```
function addAB(uint a, uint b) public returns (uint) {
      ....
    return counter + a + b;
}
```

同时，Solidity 支持函数有多个返回值：

```
function f() public pure returns (uint, bool, uint) {
        return (7, true, 2);
    }
     function g() public {
        *// 获取返回值*
        (uint x, bool b, uint y) = f();
     }    
}
```

#### ·视图函数

用 view 修饰的函数， 称为视图函数， 它只能读取状态，而不能修改状态，调用视图函数时，只需要当前链接的节点执行，就可返回结果

    function cal(uint a, uint b) public view returns (uint) {
        return a * (b + 42) + now;
    }//cal() 函数不修改状态，它不需要提交交易，也不需要花费交易费

如果视图函数在一个会修改状态的函数中调用，那么视图函数会消耗 Gas，如：

```
 function set(uint a, uint b) public returns (uint) {
            return cal(a, b);
    }
```

因为外部调用视图函数时 Gas 价格为0， 而在修改状态的函数中，Gas 价格随交易设定

#### ·纯函数

用 pure 修饰的函数， 称为纯函数， 它既不能读取也不能修改状态，仅用作计算

```
function f(uint a, uint b) public pure returns (uint) {
        return a * (b + 42);
    }
```

### 2.Data Type

#### 1）值类型（Value Types）

值类型变量表示可以用32个字节表示的数据，包含以下类型，在赋值或传参时，总是进行拷贝。

<img src="/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230706114401571.png" alt="image-20230706114401571" style="zoom:33%;" />

#### ·整型Integers

当要表示一个数值时，通常用整型来表达

**int/unit**

int/uint 表示有符号和无符号不同位数整数。支持关键字`uint8`到`uint256`（以8步进） ，`uint`和`int`默认对应的是`uint256` 和`int256`。

关键字末尾的数字表示变量所占空间大小，整数取值范围跟空间有关， `uint32`类型的取值范围是 0 到 `2^32-1`，当没有为整型变量赋值时，会使用默认值 0。

整型支持的运算符包括以下几种：

- 比较运算符： `<=`、< 、`==`、!=、`>=`、>
- 位操作符： `&`、|、`^`（异或）、`~`（位取反）
- 算术操作符：`+`、`-`、-，`*`，`/`, %, `**`（幂）
- 移位： `<<`（左移位）、 `>>`（右移位）

#### ·定长字节数组Fixed-size byte arrays

关键字为bytes1, bytes2,  ..., bytes32（以1步进），byte代表bytes1；

进行下标访问时，若x为bytesI，0 <= k < I ，则x[k]返回第k个字节

#### ·字符串常量

字符串常量是指由单引号，或双引号引起来的字符串 ("foo" or 'bar')；

字符串的长度类型是变长的，并且可以隐式的转换为byte1,...byte32 或string

#### ·十六进制常量Hexadecimal literals

以关键字hex打头，后面紧跟用单或双引号包裹的字符串，也可以转换为字节数组；内容是十六进制字符串，如hex"001122ff"，它的值会用二进制来表示

#### ·地址类型address**

Solidity 合约程序里，使用**地址类型**来表示我们的账号，另外合约和普通地址，都可以用`address` 类型表示，地址类型有两种：

- `address`：保存一个20字节的值（以太坊地址的大小）。

- `address payable`：表示可支付地址，在地址格式上，其实与`address` 完全相同，也是20字节，拥有两个成员函数`transfer`和`send` ，可以向该地址转账。当需要向地址转账时，可以使用以下代码把`address` 转换为`address payable` ：

  ```text
  address payable ap = payable(addr);
  ```

【注】：做此区分，显示的表达，一个地址可以接受ETH， 表示其有处理ETH的逻辑(EOA 账户本身可转账ETH)；如果不做区分，当我们把 ETH 转到一个地址上时，恰巧如果后者是一个合约地址又没有处理ETH的逻辑，那么 ETH 将永远锁死在该合约地址上，任何人都无法提取和使用它。

**地址类型的属性和成员函数**：

`<address>.balance`  : 返回地址的余额， 余额以wei为单位 (uint256)。

`<address payable>.transfer(uint256 amount)` : 用来向地址发送数值为`amount`的以太币(wei)，transfer ()函数只使用固定的 2300 gas , 发送失败时会抛出异常。

【注】：若addr为合约地址，合约的fallback()函数会随transfer一起执行

`<address payable>.send(uint256 amount) returns (bool)`: `send` 和`transfer` 函数一样，同样使用固定的 2300 gas , 但在发送失败时返回`false`，不抛出异常。

【注】：使用send如果调用栈的深度超过1024或gas耗光，交易都会失败，建议使用transfer

`<address>.call()`:为了和非ABI协议的合约进行交互，可以使用call() 函数, 用来向另一个合约发送原始数据，支持任何类型任意数量的参数，每个参数会按ABI协议打包成32字节拼接到一起。但例外是：如果第一个参数恰好4个字节，会被认为根据ABI协议定义的函数器指定的函数签名而直接使用。如果仅想发送消息体，需要避免第一个参数是4个字节 。函数正常结束返回true，异常终止返回false，但无法获取到结果数据：

```
address nameReg = 0x72ba7d8e73fe8eb666ea66babc8116a41bfb10e2; nameReg.call("register", "MyName");
nameReg.call(bytes4(keccak256("fun(uint256)")), a);
```

还可以使用delegatecall()，与call的区别在于，仅仅执行代码，而其它方面如（存储，余额等）都是用的当前的合约的数据。delegatecall()方法的目的是用来执行另一个合约中的库代码，这时需要保证两个合约中的存储变量能兼容，保证delegatecall()能执行。

在homestead阶段前，仅有一个受限的callcode()方法可用，但callcode未提供对msg.sender，msg.value的访问权限，不鼓励使用。

eg：

```solidity
contract testAddr {
   
   // 如果合约的余额大于等于10，而x小于10,则给x转10 wei
    function testTrasfer(address payable x) public {
       address myAddress = address(this);//把合约转换为地址类型
       if (x.balance < 10 && myAddress.balance >= 10) {  //balance获取余额
           x.transfer(10);  //转账
       }
    }
}
```

#### ·函数类型Function Types

函数类型有两类：

**内部(internal)函数**只能在当前合约内被调用（在当前的代码块内，包括内部库函数，和继承的函数中）。
**外部(external)函数**由地址和函数方法签名两部分组成，可作为外部函数调用的参数，或返回值。

【注】：函数类型仅是当作类型名使用时默认是internal，因此可以省略，但合约中函数本身默认是public

函数可见性：

- public - 任意访问
- private - 仅当前合约内
- internal - 仅当前合约及所继承的合约
- external - 仅外部访问（在内部也只能用外部访问方式访问）

#### ·合约类型

合约是一个类型，我们可以通过这个合约类型来创建合约（即部署合约），然后与合约里的函数交互，比如调用一个合约的函数可以创建一个另一个合约：

```
pragma solidity ^0.8.0;

contract Hello {
  function sayHi() public view returns  (uint) {
      return 10;
  }
}

contract HelloCreator {
    uint public x;
    Hello public h;

  function createHello() public returns (address) {
    h = new Hello();
    return address(h);
  }
}
```

**合约类型数据成员：**

对于某个合约c有

（1）`type(C).name` ：获得合约的名字。

（2）`type(C).creationCode`：获得创建合约的字节码。

（3）`type(C).runtimeCode`：获得合约运行时的字节码。

【问】**：如何区分合约和外部地址**

答：经常需要区分一个地址是合约地址还是外部账号地址，区分的关键是看这个地址有没有与之相关联的代码。EVM提供了一个操作码`EXTCODESIZE`，用来获取地址相关联的代码大小（长度），如果是外部账号地址，则没有代码返回。因此我们可以使用以下方法判断合约地址及外部账号地址。

```text
function isContract(address addr) internal view returns (bool) {
  uint256 size;
  assembly { size := extcodesize(addr) }
  return size > 0;
  }
```

如果是在合约外部判断，则可以使用`web3.eth.getCode()`（一个Web3的API），或者是对应的JSON-RPC方法——eth_getcode。getCode()用来获取参数地址所对应合约的代码，如果参数是一个外部账号地址，则返回“0x”；如果参数是合约，则返回对应的字节码，下面两行代码分别对应无代码和有代码的输出。

```text
>web3.eth.getCode(“0xa5Acc472597C1e1651270da9081Cc5a0b38258E3”) 
“0x”
>web3.eth.getCode(“0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8”) “0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056” 
```

这时候，通过对比`getCode()`的输出内容，就可以很容易判断出是哪一种地址。

#### 2）引用类型（Reference Types）

引用类型用来表示复杂类型，占用的空间超过32字节，在申明一个引用类型的变量，需要指定该变量的位置，拷贝时开销很大，因此我们需要考虑将它们存储在什么位置,在定义引用类型arrays和struct时，有一个额外属性来标识数据的存储位置：

memory（内存）： 变量在运行时存在，其生命周期只存在于函数调用期间，函数参数默认是memory，gas开销较小。

storage（存储）：只要合约存在就一直保存在区块链中，局部复杂类型变量（local variables）和状态变量（state variables） 默认是stroage，gas开销最大。

calldata（调用数据）：一般用来存储函数参数的特殊数据位置，用来接收外部数据，是一个**不可修改的、非持久**的函数参数存储区域，gas开销最小。

【注】：**不同引用类型在进行赋值的时候，只有在不同的数据位置赋值时会进行一份拷贝，而在同一数据位置内通常是增加一个引用**。

#### ·数组

**def**：

数组和大多数语言一样， 在一个类型后面加上一个`[]`，表示可以存储一组该类型的值。数组类型有两种：固定长度和动态长度

```
    // 状态变量缺省位置为 storage 
    uint [10] tens; // 固定长度的数组
    uint [] numbers;  // 动态长度的数组
    address [10] admins；  //admins最多有10个地址
    
    // 作为参数，使用 calldata 
    function copy(uint[] calldata arrs) public {
        numbers = arrs;  //  赋值时，不同的数据位置的变量会进行拷贝。 
    }
    
    // 作为参数，使用 memory 
    function handle(uint[] memory arrs) internal {
    }
}
```

数组的初始化可以在声明时进行，还可以用new关键字进行声明，创建基于运行时长度的memory数组，使用 new 创建内存数组时，会根据长度在内存中分配相应的空间；如果变量是在stroage中，则表示分配一个起始空间，在之后运行过程中可以扩展该空间

**数组成员：**

- `length`：表示当前数组的长度（只读）。
- `push()`：用来添加新的零初始化元素到数组末尾，并返回元素的引用，以便修改元素的内容，如：`x.push().t = 2`或`x.push() = b`，只对存储（storage）中的动态数组有效。
- push(x)：添加给定元素到数组末尾。 没有返回值，只对存储（storage）中的动态数组有效
- `pop()`：从数组末尾删除元素，数组的长度减1，会在移除的元素上隐含调用delete，及时释放不使用的空间，节约gas。pop()没有返回值，只对存储（storage）中的动态数组有效。

**特殊的数组类型：**

string：一个字符串也可以是一个字符数组，但不支持数组的push&pop方法

bytes：动态分配大小字节的数组，类似于byte[]，但是bytes的gas费用更低。bytes 也可以用来表达字符串， 但通常用于原始字节数据；支持push&pop

```
    //声明
    bytes bs;
    bytes bs0 = "12abcd";

    string str1 = "TinyXiong";
    string name;
```

【注】：字符串s通过`bytes(s)`转为一个bytes，通过下标访问`bytes(s)[i]`获取到的不是对应字符，而是获取对应的UTF-8编码；Solidity 语言本身提供的`string`功能比较弱，并没有提供一些实用函数

**数组gas消耗**：

```
function sum() public {
        uint len = numbers.length;
        for (uint i = 0; i < len; i++) {
            total += numbers[i];
        }
```

分析上述sum()函数可以看出gas消耗是随着`numbers` 元素线性增长的，如果`numbers` 元素非常多，`sum()` 消耗 gas 会超过区块 gas 限制而无法执行，常见的解决方案：

1. 将非必要的计算转移到链下进行。
2. 想办法控制数组的长度。
3. 想方法分段计算，让每段的计算工作量 Gas 可控。

#### ·结构体

Solidity 使用 `struct` 关键字来定义一个自定义组合类型

同时需要为每个成员定义其类型，除可以使用基本类型作为成员以外，还可以使用[数组](https://decert.me/tutorial/solidity/solidity-basic/array)、结构体、[映射](https://decert.me/tutorial/solidity/solidity-basic/mapping)作为成员：

```
struct Student {
    string name;
    mapping(string=>uint) score;
    int age;
}
```

**结构体的声明赋值**

```
// 声明变量而不初始化
  Person person;

// 只能作为状态变量这样使用，按成员顺序（结构体声明时的顺序）赋值
Person person = Person(address(0x0), false, 18) ;
// 在函数内声明
Person memory person = Person(address(0x0), false, 18) ;

// 使用具名变量初始化，可不按成员定义的顺序赋值
Person person = Person({account: address(0x0), gender: false, age: 18}) ;

//在函数内声明
Person memory person =  Person({account: address(0x0), gender: false, age: 18}) ;
```

#### 3）映射类型（Mapping Types）

一种键值对的映射关系存储结构，定义方式为mapping，和Java的Map、Python的Dict在功能上类似。仅能用来作为状态变量，或在内部函数中作为storage类型的引用。

定义方式为**mapping(_KeyType => _KeyValue)**。键类型允许除映射、变长数组、合约、枚举、结构体外的几乎所有类型；值类型没有任何限制，可以为任何类型。

**映射**可以被视作为一个哈希表，所有可能的键会被虚拟化的创建，映射到一个类型的默认值（二进制的全零表示）。在映射表中，并不存储键的数据，仅仅存储它的keccak256哈希值，这个哈希值在查找值时需要用到。正因为此，**映射**是没有长度的，也没有键集合或值集合的概念。



## No.2 Solidity advanced

### 1. Solidity API

[Solidity](https://learnblockchain.cn/docs/solidity/) API 主要表现为Solidity 内置的特殊的变量及函数，他们存在于全局命名空间里，主要分为以下几类：

#### 1）区块和交易的属性

提供一些区块链当前的信息

- blockhash(uint blockNumber) returns (bytes32)：返回给定区块号的哈希值，只支持最近256个区块，且不包含当前区块。
- block.coinbase (address): 当前块矿工的地址。
- block.difficulty (uint):当前块的难度。
- block.gaslimit (uint):当前块的gaslimit。
- block.number (uint):当前区块的块号。
- block.timestamp (uint): 当前块的Unix时间戳
- gasleft() (uint256): 获取剩余gas。
- msg.data (bytes): 完整的调用数据（calldata）。
- msg.gas (uint): 当前还剩的gas（弃用）。
- msg.sender (address): 当前调用发起人的地址。
- msg.sig (bytes4):调用数据(calldata)的前四个字节（例如为：函数标识符）。
- msg.value (uint): 这个消息所附带的以太币，单位为wei。
- now (uint): 当前块的时间戳(block.timestamp的别名)
- tx.gasprice (uint) : 交易的gas价格。
- tx.origin (address): 交易的发送者（全调用链）

【注】：msg的所有成员值，如msg.sender,msg.value的值可以因为每一次外部函数调用，或库函数调用发生变化（因为msg就是和调用相关的全局变量）

#### 2）错误处理

Solidity是通过回退状态的方式来处理错误。发生异常时会撤消当前调用（及其所有子调用）所改变的状态，同时给调用者返回一个错误标识。

- assert(bool condition)：用于判断内部错误，条件不满足时抛出异常

- require(bool condition, string message)：用于判断输入或外部组件错误，条件不满足时抛出错误信息。

- revert(string reason)：终止执行并还原改变的状态，并提供一个错误信息。

  老的throw 的方式已经被弃用

#### 3）合约相关

- this（当前合约的类型）:表示当前合约，可以显式的转换为Address
- selfdestruct(address recipient)：销毁当前合约，并把它所有资金发送到给定的地址别名为：suicide(address recipient)

当前合约里的所有函数均可支持调用，包括当前函数本身。

#### 4）加密功能

- keccak256(...) returns (bytes32)：使用以太坊（Keccak-256）计算HASH值，紧密打包参数。
- sha256(...) returns (bytes32)：使用SHA-256计算hash值，紧密打包参数。
- sha3(...) returns (bytes32)：keccak256的别名
- ripemd160(...) returns (bytes20)：使用RIPEMD-160计算HASH值。紧密打包参数。
- ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)：通过椭圆曲线签名来恢复与公钥关联的地址，或者在错误时返回零。可用于签名数据的校验，如果返回结果是签名者的公匙地址，那么说明数据是正确的。

紧密打包参数（tightly packed）指参数不会补位，是直接连接在一起的，eg：

```
keccak256("ab", "c")
keccak256("abc")
```

### 2.函数调用

#### 1）内部函数调用（Internal Function Calls）

内部调用，不会创建一个EVM消息调用。而是直接调用或者递归调用当前合约的函数。

这些函数调用被转换为EVM内部的简单指令跳转（jumps）。 这样使得当前的内存不会被回收，在一个内部调用时传递一个内存型引用效率将非常高。当然，仅仅是同一个合约的函数之间才可通过内部的方式进行调用。

```
pragma solidity ^0.4.16;

contract C {
    function g(uint a) public pure returns (uint ret) {
      return f();       // 直接调用
    }
    

    function f() internal pure returns (uint ret) {
     return g(7) + f();    // 直接调用及递归调用
    }

}
```

#### 2）外部函数调用（External Function Calls）

外部调用，不是EVM的指令跳转，而是发起EVM消息调用。例如表达式this.g(8);和c.g(2)（c是一个合约实例）是外部调用函数的方式。但在合约的构造器中，不能使用this调用函数，因为当前合约还没有创建完成。其它合约的函数必须通过外部的方式调用。

对于一个外部调用，所有函数的参数必须要拷贝到内存中。

当调用其它合约的函数时，还可以通过选项**.value()**，和**.gas()**来分别指定要发送的以太币和gas值：

```
pragma solidity ^0.4.0;

contract InfoFeed {
    function info() public payable returns (uint ret) { return 42; }
}   //必须使用payable关键字，否则不能通过value()来接收以太币。

contract Consumer {
    InfoFeed feed;
    
    function setFeed(address addr) public {
      feed = InfoFeed(addr);//进行显示的类型转换，表示给定地址是合约InfoFeed类型，这里并不执行构造器的初始化；也可以使用function setFeed(InfoFeed _feed) { feed = _feed; }来直接进行赋值。
    }
    
    function callFeed() public {
      feed.info.value(10).gas(800)();  // 设置附加以太币及gas来调用info，真正的调用是后面的括号()，调用callFeed时，需要预先存入一定量的以太币，要不能会因余额不足报错
    }
}

```

### 3.以太坊ABI

 Application Binary Interface，应用程序二进制接口，就是以太坊的调用合约时的接口说明，要想和合约交互，就离不开ABI数据

<img src="/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230712152728120.png" alt="image-20230712152728120" style="zoom:33%;" />

eg：以下面合约为例，查看用参数 1 调用`set(uint x)`这个交易附带的数据是什么？

```
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;
    
    function set(uint x) public {
        storedData = x;
    }
    
    function get() public constant returns (uint) {
        return storedData;
    }

}
```

先把合约部署到以太坊网络上，然后用 “1” 作为参数调用set，然后我们打开etherscan查看[交易详情数据](https://ropsten.etherscan.io/tx/0xd773a6909808f99c5a26c0c890af8b0bb6d784f29a3af55e04fa35d44d7716e2), 看到其附加数据：

<img src="/Users/sunlongyu/Library/Application Support/typora-user-images/image-20230712153254608.png" alt="image-20230712153254608" style="zoom:33%;" />

ABI的编码数据就是：

```undefined
0x60fe47b10000000000000000000000000000000000000000000000000000000000000001
```

这个数据可以分成两个子部分：

- 函数选择器(4字节)0x60fe47b1，即对函数签名字符串进行sha3（keccak256）哈希运算之后，取前4个字节：   

  ```
   bytes4(sha3(“set(uint256)”)) == 0x60fe47b1
  ```

- 第一个参数(32字节)，使用对应的16进制数
  00000000000000000000000000000000000000000000000000000000000000001

获得函数对应的ABI 数据有两种方法：

一个是 solidity 提供了ABI的相关[API](https://learnblockchain.cn/2018/03/14/solidity-api/)， 通过ABI编码函数可以在不用调用函数的情况下，获得ABI编码值：

- abi.encode(...) returns (bytes)：计算参数的ABI编码。
- abi.encodePacked(...) returns (bytes)：计算参数的紧密打包编码
- abi. encodeWithSelector(bytes4 selector, ...) returns (bytes)： 计算函数选择器和参数的ABI编码
- abi.encodeWithSignature(string signature, ...) returns (bytes): 等价于 abi.encodeWithSelector(bytes4(keccak256(signature), ...)

eg：

```
   function abiEncode() public constant returns (bytes) {        
      abi.encode(1);  // 计算1的ABI编码
      return abi.encodeWithSignature("set(uint256)", 1); //计算函数set(uint256) 及参数1 的ABI 编码   
    }
```

另一个web3提供相应的API，如使用web3计算函数选择器的方式：

```
web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)');
```
### 4.Function Modifers

Modifiers可以用来改变一个函数的行为，如用于在函数执行前检查某种前置条件。

修改器是一种可被继承合约属性，同时还可被继承的合约重写(override)
### 