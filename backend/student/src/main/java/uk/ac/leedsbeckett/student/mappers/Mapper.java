package uk.ac.leedsbeckett.student.mappers;

public interface Mapper<A, B> {

    B mapTo(A a);
    A mapFrom (B b);

}
