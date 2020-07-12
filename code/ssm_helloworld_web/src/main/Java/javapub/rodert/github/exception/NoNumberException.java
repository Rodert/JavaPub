/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:30
 * @description
 */
package javapub.rodert.github.exception;

/**
 * 库存不足异常
 */
public class NoNumberException extends RuntimeException {

    public NoNumberException(String message) {
        super(message);
    }

    public NoNumberException(String message, Throwable cause) {
        super(message, cause);
    }

}

