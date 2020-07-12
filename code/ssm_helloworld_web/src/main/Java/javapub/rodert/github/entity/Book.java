package javapub.rodert.github.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 20:58
 * @description
 *
 * @Data 注解，简化代码，自动添加get set toSting 方法
 * @Getter
 * @Setter
 * @ToString
 */
@Getter
@Setter
@ToString
public class Book {

    private long bookId;// 图书ID

    private String name;// 图书名称

    private int number;// 馆藏数量

    // 省略构造方法，getter和setter方法，toString方法

}
