
/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:40
 * @description
 */
package javapub.rodert.github.service.impl;


import javapub.rodert.github.BaseTest;
import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.service.BookService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class BookServiceImplTest extends BaseTest {

    @Autowired
    private BookService bookService;

    @Test
    public void testAppoint() throws Exception {
        long bookId = 1001;
        long studentId = 12345678910L;
        AppointExecution execution = bookService.appoint(bookId, studentId);
        System.out.println(execution);
    }

}

