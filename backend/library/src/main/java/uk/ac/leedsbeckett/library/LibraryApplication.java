package uk.ac.leedsbeckett.library;

import lombok.extern.java.Log;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;

@SpringBootApplication
@Log
public class LibraryApplication implements CommandLineRunner {
	private final DataSource dataSource;

	public LibraryApplication(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@Override
	public void run(final String... args) {
		log.info("The Database connection with " + dataSource.toString() + " is successful 🚀");
	}
}
