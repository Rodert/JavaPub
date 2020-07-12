package javapub.rodert.github.exception;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:31
 * @description
 */

/**
 * 预约业务异常
 */
public class AppointException extends RuntimeException {

    public AppointException(String message) {
        super(message);
    }

    public AppointException(String message, Throwable cause) {
        super(message, cause);
    }

}

