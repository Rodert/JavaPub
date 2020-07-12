package javapub.rodert.github.dto;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:26
 * @description
 */


import javapub.rodert.github.entity.Appointment;
import javapub.rodert.github.enums.AppointStateEnum;
import lombok.Data;

/**
 * 封装预约执行后结果
 */
@Data
public class AppointExecution {

    // 图书ID
    private long bookId;

    // 秒杀预约结果状态
    private int state;

    // 状态标识
    private String stateInfo;

    // 预约成功对象
    private Appointment appointment;

    public AppointExecution() {
    }

    // 预约失败的构造器
    public AppointExecution(long bookId, AppointStateEnum stateEnum) {
        this.bookId = bookId;
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
    }

    // 预约成功的构造器
    public AppointExecution(long bookId, AppointStateEnum stateEnum, Appointment appointment) {
        this.bookId = bookId;
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.appointment = appointment;
    }

    // 省略getter和setter方法，toString方法

}

