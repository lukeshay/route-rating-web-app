package com.lukeshay.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/** The type Rest api application. */
@SpringBootApplication
@EnableMongoAuditing
public class RestApiApplication {

  /**
   * The entry point of application.
   *
   * @param args the input arguments
   */
  public static void main(String[] args) {
    SpringApplication.run(RestApiApplication.class, args);
  }
}