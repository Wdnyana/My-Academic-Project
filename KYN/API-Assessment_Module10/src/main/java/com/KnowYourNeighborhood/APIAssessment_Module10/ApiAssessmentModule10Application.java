package com.KnowYourNeighborhood.APIAssessment_Module10;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.KnowYourNeighborhood.APIAssessment_Module10.Configuration.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ApiAssessmentModule10Application {

	public static void main(String[] args) {
		SpringApplication.run(ApiAssessmentModule10Application.class, args);
	}

}
