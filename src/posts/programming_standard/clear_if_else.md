---
title: 优化if-else的11种方案
icon: lightbulb
author: Wang Shiyu
date: 2022-07-08
category:
  - 编程规范
tag:
  - 编程规范
---



![_63f4e0e5-ab7b-49e8-a491-246183324b86](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202408052151443.jpeg)



> 优雅永不过时！


![image-20240805201630837](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202408052016936.png)




### 1. 使用早返回（Early Return）：尽可能早地返回，避免嵌套的if-else。

优化前：

```java
public class NoEarlyReturnExample {
    public boolean hasPositiveNumber(int[] numbers) {
        boolean foundPositive = false;
        for (int number : numbers) {
            if (number > 0) {
                foundPositive = true;
                // 没有早返回，而是继续循环
            }
        }
        return foundPositive; // 循环结束后返回结果
    }
}
```

优化后：

```java
public class EarlyReturnExample {
    public boolean hasPositiveNumber(int[] numbers) {
        for (int number : numbers) {
            if (number > 0) {
                return true; // 找到正数立即返回
            }
        }
        return false; // 没有找到正数
    }
}
```

减少了多次循环

### 2. 使用三元运算符：在条件简单的情况下，可以使用三元运算符来简化代码。


优化前：

```java
public class NoTernaryOperatorExample {
    public String getGender(int number) {
        if (number > 0) {
            return "girl";
        } else if (number < 0) {
            return "boy";
        } else {
            return "other";
        }
    }
}
```

优化后：

```java
public class TernaryOperatorExample {
    public String getGender(int number) {
        return (number > 0) ? "girl" : (number < 0) ? "boy" : "other";
    }
}
```


### 3. 使用switch-case语句：如果你的条件是基于不同的情况或值，更好的选择是switch-case。


优化前：

```java
public class NoSwitchCaseExample {
    public void performAction(String action) {
        if ("start".equals(action)) {
            System.out.println("Starting...");
        } else if ("stop".equals(action)) {
            System.out.println("Stopping...");
        } else {
            System.out.println("Unknown action");
        }
    }
}
```

优化后：

```java
public class SwitchCaseExample {
    public void performAction(String action) {
        switch (action) {
            case "start":
                System.out.println("Starting...");
                break;
            case "stop":
                System.out.println("Stopping...");
                break;
            default:
                System.out.println("Unknown action");
        }
    }
}
```


### 4. 使用策略模式：将每个条件分支封装成一个策略对象，然后根据条件选择使用哪个策略。


优化前：

```java
public class NoStrategyExample {
    public void context() {
        // 没有使用策略模式，而是直接执行代码
        System.out.println("Direct execution");
        // do something...
    }
}
```

优化后：

```java
public class StrategyExample {
    interface Strategy {
        void execute();
    }

    public class ConcreteStrategyA implements Strategy {
        public void execute() {
            System.out.println("Strategy A executed");
        }
    }

    public void context(Strategy strategy) {
        strategy.execute();
    }
}
```



### 5. 使用查找表：对于固定数量的条件分支，可以使用查找表（例如字典或哈希表）来映射条件和对应的行为。


优化前：

```java
public class NoLookupTableExample {
    public void performAction(String action) {
        // 没有使用查找表，而是使用if-else
        if ("start".equals(action)) {
            System.out.println("Starting...");
        } else if ("stop".equals(action)) {
            System.out.println("Stopping...");
        } else {
            System.out.println("No action found");
        }
    }
}
```

优化后：

```java
public class LookupTableExample {
    public void performAction(Map<String, Runnable> actions, String key) {
        actions.getOrDefault(key, () -> System.out.println("No action found")).run();
    }
}
```



### 6. 使用函数或方法：将每个条件分支的逻辑封装到不同的函数或方法中，然后在if-else中调用这些函数。


优化前：

```java
public class NoFunctionExample {
    public void handleUserType(String userType) {
        // 没有使用函数封装，而是直接在if-else中编写逻辑
        if ("admin".equals(userType)) {
            System.out.println("Admin logic here");
        } else if ("user".equals(userType)) {
            System.out.println("User logic here");
        } else {
            System.out.println("Guest logic here");
        }
    }
}
```

优化后：

```java
public class FunctionExample {
    public void handleUserType(String userType) {
        if ("admin".equals(userType)) {
            handleAdmin();
        } else if ("user".equals(userType)) {
            handleUser();
        } else {
            handleGuest();
        }
    }

    private void handleAdmin() {
        System.out.println("Handling admin");
    }

    private void handleUser() {
        System.out.println("Handling user");
    }

    private void handleGuest() {
        System.out.println("Handling guest");
    }
}
```


这个是大家比较常用的，通过不同的功能拆分成不同的函数。



### 7. 使用命令模式：将每个条件分支封装成一个命令对象，然后根据条件执行相应的命令。


优化前：

```java
public class NoCommandExample {
    public void performAction(String action) {
        // 直接执行动作，没有使用命令模式
        if ("start".equals(action)) {
            System.out.println("Starting...");
        } else if ("stop".equals(action)) {
            System.out.println("Stopping...");
        }
    }
}
```

优化后：

```java
public class CommandExample {
    interface Command {
        void execute();
    }

    public class StartCommand implements Command {
        public void execute() {
            System.out.println("Starting...");
        }
    }

    public class StopCommand implements Command {
        public void execute() {
            System.out.println("Stopping...");
        }
    }

    public void executeCommand(Command command) {
        command.execute();
    }
}
```



### 8. 使用状态模式：如果逻辑分支与状态有关，可以使用状态模式来管理状态转换。



优化前：

```java
public class NoStateExample {
    public void handleAction(String state) {
        // 没有使用状态模式，直接在代码中处理逻辑
        if ("start".equals(state)) {
            System.out.println("Handling start");
        } else if ("stop".equals(state)) {
            System.out.println("Handling stop");
        }
    }
}
```

优化后：

```java
public class StateExample {
    interface State {
        void handle();
    }

    public class StartState implements State {
        public void handle() {
            System.out.println("Handling start state");
        }
    }

    public class StopState implements State {
        public void handle() {
            System.out.println("Handling stop state");
        }
    }

    public class Context {
        private State state;

        public void setState(State state) {
            this.state = state;
        }

        public void request() {
            state.handle();
        }
    }
}
```

状态转换类似于我们在做一个简单的工单流转，每一步都是确定且可复用的场景。



### 9. 重构条件表达式：检查是否可以将复杂的条件表达式分解为更简单的部分。


优化前：

```java
public class UnrefactoredConditionExample {
    public boolean isWeekend(int day) {
        // 没有重构的条件表达式，切套多、不好阅读
        if (day == 6 || (day == 7 && !isHoliday(day))) {
            return true;
        }
        return false;
    }
    
    private boolean isHoliday(int day) {
        // 法定的假日检查逻辑（法定节假日每年都在变）
        return false;
    }
}
```

优化后：

```java
public class RefactoredConditionExample {
    public boolean isWeekend(int day) {
        return day == 6 || day == 7;
    }
}
```

简洁了很多


### 10. 使用断言：在某些情况下，使用断言来确保代码的预设条件被满足，避免复杂的条件判断。


优化前：

```java
public class NoAssertExample {
    public void process(int value) {
        if (value <= 0) {
            throw new IllegalArgumentException("Value must be positive");
        }
        // 处理逻辑
        System.out.println("Processing value: " + value);
    }
}
```

优化后：

```java
public class AssertExample {
    public void process(int value) {
        assert value > 0 : "Value must be positive";
        // 处理逻辑
        System.out.println("Processing value: " + value);
    }
}
```

多数编程中，断言被用在自动化测试用例。不过预设条件判断用起来也非常丝滑。



### 11. 使用异常处理：在某些情况下，使用异常处理来简化错误条件的处理。

优化前：

```java
public class NoExceptionHandlingExample {
    public int divide(int dividend, int divisor) {
        if (divisor == 0) {
            // 没有使用异常处理，而是直接返回错误代码
            System.out.println("Cannot divide by zero");
            return -1;
        }
        return dividend / divisor;
    }
}
```

优化后：

```java
public class ExceptionHandlingExample {
    public int divide(int dividend, int divisor) {
        try {
            return dividend / divisor;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
            return -1;
        }
    }
}
```

当遇到异常，尽可能在合适的地方捕获并处理，不要直接把所有异常都抛到最外层。



