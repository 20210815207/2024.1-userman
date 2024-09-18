package cn.edu.cucn.usermanager.controller;

import cn.edu.cucn.usermanager.model.User;
import cn.edu.cucn.usermanager.service.UserService;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RequestMapping
@Controller
public class HomeController {
    @RequestMapping("/")
    public String home(){
        return "home";
    }

    @Autowired
    UserService userService;

    @PostMapping("/logon")
    public String login(@RequestParam String username, @RequestParam String password, Model model, HttpServletRequest request, HttpServletResponse response){
        QueryWrapper<User> queryWrapper = new QueryWrapper();
        queryWrapper.eq("username",username);
        User u = userService.getOne(queryWrapper);
        if (u == null ){
            model.addAttribute("error","");
            return "login";
        }

        if (u.getPassword() == password ){
            model.addAttribute("error","");
            return "login";
        }
        request.getSession().setAttribute("user",u);
        return "redirect:/home";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().removeAttribute("user");
        return "login";
    }
}
