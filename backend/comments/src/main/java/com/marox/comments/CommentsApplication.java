package com.marox.comments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.marox.comments.dto.AccountsContactInfoDto;
@SpringBootApplication
@EnableConfigurationProperties(value = {AccountsContactInfoDto.class})
public class CommentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommentsApplication.class, args);
	}

}
