package uk.ac.leedsbeckett.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Api {

    @GetMapping(path = "/hello")
    public String helloWorld() {
        return "Hello Student Portal!";
    }
}
