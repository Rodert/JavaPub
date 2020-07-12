package javapub.rodert;


import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author wangshiyu rodert
 * @date 2020/7/2 20:15
 * @description
 */
public class PersonDaoTest {

    @Test
    public void test1(){
        //加载配置
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        //获取实例
        PersonDao personDao = (PersonDao) applicationContext.getBean("personDao");
        personDao.add();
    }


    @Test
    public void test2(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        PersonService personService = (PersonService) applicationContext.getBean("personService");
        personService.addPerson();
    }

}
