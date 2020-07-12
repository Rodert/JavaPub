
/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:31
 * @description
 */
package javapub.rodert.github.exception;

/**
 * 重复预约异常
 */
public class RepeatAppointException extends RuntimeException {

    public RepeatAppointException(String message) {
        super(message);
    }

    public RepeatAppointException(String message, Throwable cause) {
        super(message, cause);
    }

}

