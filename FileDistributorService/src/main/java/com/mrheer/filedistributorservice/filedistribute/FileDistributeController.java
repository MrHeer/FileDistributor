package com.mrheer.filedistributorservice.filedistribute;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class FileDistributeController {
    @GetMapping
    public String helloGradle() {
        return "Hello Gradle!";
    }
}
