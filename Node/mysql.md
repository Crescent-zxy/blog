# MySql

### 数据类型

主要使用前三种

#### 数字类型

* bit
* tinyint
* smallint
* mediumint
* int
* bigint
* bool,boolean
* decimal
* float
* double
* serial （系列号）等价于 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE

#### 字符串类型

* char(100)
* varchar(100)
* binary(1024)
* varbinary(1024)
* blob
* text
* enum('v1','v2')
* set('v1','v2')

#### 时间和日期类型

* date
* time
* datetime
* timestamp
* year

**ISO 8601**

```javascript
const time = '2022-05-17T20:00:00.000+08:00'
new Date(Date.parse(time))
```

#### JSON 类型（5.7.8 以上）

#### 其他特殊类型
