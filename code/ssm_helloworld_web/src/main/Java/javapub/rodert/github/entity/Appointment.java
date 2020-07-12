package javapub.rodert.github.entity;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 20:58
 * @description
 */

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * 预约图书实体
 * @Data 注解，简化代码，自动添加get set toSting 方法
 */
@Data
public class Appointment {

    private long bookId;// 图书ID

    private long studentId;// 学号

    private Date appointTime;// 预约时间

    // 多对一的复合属性
    private Book book;// 图书实体

    // 省略构造方法，getter和setter方法，toString方法

}

