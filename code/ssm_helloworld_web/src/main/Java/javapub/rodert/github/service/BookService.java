
/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:32
 * @description
 */
package javapub.rodert.github.service;


import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.entity.Book;

import java.util.List;

/**
 * 业务接口：站在"使用者"角度设计接口 三个方面：方法定义粒度，参数，返回类型（return 类型/异常）
 */
public interface BookService {

    /**
     * 查询一本图书
     *
     * @param bookId
     * @return
     */
    Book getById(long bookId);

    /**
     * 查询所有图书
     *
     * @return
     */
    List<Book> getList();

    /**
     * 预约图书
     *
     * @param bookId
     * @param studentId
     * @return
     */
    AppointExecution appoint(long bookId, long studentId);

}
