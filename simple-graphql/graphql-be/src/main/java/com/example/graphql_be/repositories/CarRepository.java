package com.example.graphql_be.repositories;

import com.example.graphql_be.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
}
