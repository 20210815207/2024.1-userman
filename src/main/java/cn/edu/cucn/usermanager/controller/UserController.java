package cn.edu.cucn.usermanager.controller;

import cn.edu.cucn.usermanager.common.Result;
import cn.edu.cucn.usermanager.common.ResultUtil;
import cn.edu.cucn.usermanager.model.User;
import cn.edu.cucn.usermanager.service.UserService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping
    public String user(){
        return "user";
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Result<User> get(@PathVariable Integer id){
        return null;
    }

    /**
     *  分页查询
     * @param username
     * @param pageNo
     * @param pageSize
     * @return
     */
    @PostMapping("/list")
    @ResponseBody
    public Result<IPage<User>> list(@RequestParam(value = "username", required = false) String username,
                             @RequestParam(defaultValue = "1") Integer pageNo,
                             @RequestParam(defaultValue = "10") Integer pageSize){
        // 构造查询条件
        // 设置总记录数
        return null;
    }

    @PostMapping("/add")
    @ResponseBody
    public Result<String> add(@RequestBody User user){
        return null;
    }

    @PostMapping("/modify")
    @ResponseBody
    public Result<String> modify(@RequestBody User user){
        return null;
    }

    @PostMapping("/remove")
    @ResponseBody
    public Result<String> remove(@RequestParam Integer id){
        return null;
    }
}
