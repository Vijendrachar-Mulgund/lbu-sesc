package uk.ac.leedsbeckett.student;

import lombok.extern.java.Log;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;

@SpringBootApplication
@Log
public class StudentApplication implements CommandLineRunner {

	private final DataSource dataSource;

	public StudentApplication(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public static void main(String[] args) {
		SpringApplication.run(StudentApplication.class, args);
	}

	@Override
	public void run(final String... args) {
		log.info("The Database connection with " + dataSource.toString() + " is successful 🚀");
	}
}
