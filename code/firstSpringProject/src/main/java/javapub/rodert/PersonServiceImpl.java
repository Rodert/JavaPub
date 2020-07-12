package javapub.rodert;

/**
 * @author wangshiyu rodert
 * @date 2020/7/2 21:40
 * @description
 */
public class PersonServiceImpl implements PersonService {

    //定义接口声明
    private PersonDao personDao;

    //提供set() 方法，用于依赖注入
    public void setPersonDao(PersonDao personDao){
        this.personDao = personDao;
    }

    //实现PersonService 接口的方法
    public void addPerson() {
        personDao.add();
        System.out.println("addPerson() 执行 ！！！");
    }
}
