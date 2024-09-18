package cn.edu.cucn.usermanager.service;

import cn.edu.cucn.usermanager.model.User;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import cn.edu.cucn.usermanager.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**

 **/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements  UserService {
}
