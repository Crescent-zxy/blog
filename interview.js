// 数组拍平排序去重
function flatArray(arr) {
  return arr.reduce((acc, value) => {
    acc.concat(Array.isArray(value) ? flatArray(value) : value);
  }, []);
}

[...new Set(flatArray([]).sort((a, b) => a - b))];

// 防抖
function debounce(fn, time) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, time);
  };
}

// 节流
function throttle(fn, time) {
  let canDo = true;
  return () => {
    if (canDo) {
      fn();
      canDo = false;
      setTimeout(() => {
        canDo = true;
      }, time);
    }
  };
}

// eventBus
class EventBus {
  constructor() {
    this.event = {};
  }

  on(event, listener) {
    if (!this.event[event]) {
      this.event[event] = [];
    }
    this.event[event].push(listener);
  }

  emit(event, data) {
    if (this.event[event]) {
      this.event[event].forEach((listener) => {
        listener(data);
      });
    }
  }

  off(event, removeListener) {
    if (!this.event[event]) {
      return;
    }
    this.event[event] = this.event[event].filter(
      (listener) => listener !== removeListener
    );
  }
}

// 正确的括号
function IsValid(str) {
  const stack = [];
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let char of str) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// 并发控制
const fetchConcurrent = (urls, limit) => {
  const first = urls.slice(0, limit);
  let index = limit;

  const fetchNext = async () => {
    if (index >= urls.length) return;

    index++;
    fetch(urls[index]).then(() => {
      fetchNext();
    });
  };

  first.forEach((url) => {
    fetch(url).then(() => {
      fetchNext();
    });
  });
};

// 括号的组合
function generateParenthesis(n) {
  const result = [];

  const backtrack = (current, left, right) => {
    if ((current.length = 2 * n)) {
      result.push(current);
      return;
    }

    // 添加左括号
    if (left < n) {
      backtrack(current + "(", left + 1, right);
    }

    // 添加右括号
    if (right < left) {
      backtrack(current + ")", left, right + 1);
    }
  };

  backtrack("", 0, 0);
  return result;
}

// 无重复字符的最长子串
function strLength(str) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < str.length; right++) {
    // 当发现重复字符时，移动左指针缩小窗口
    while (charSet.has(str(right))) {
      charSet.delete(str(left));
      left++;
    }

    // 添加当前字符到集合
    charSet.add(str);

    // 更新最大长度
    maxLength = Math.length(maxLength, right - left + 1);
  }

  return maxLength;
}
