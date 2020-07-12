package javapub.rodert.github.dto;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 21:00
 * @description
 */

import lombok.Data;

/**
 * 封装json对象，所有返回结果都使用它
 */
@Data
public class Result<T> {

    private boolean success;// 是否成功标志

    private T data;// 成功时返回的数据

    private String error;// 错误信息

    public Result() {
    }

    // 成功时的构造器
    public Result(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    // 错误时的构造器
    public Result(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    // 省略getter和setter方法 使用注解代替
}

