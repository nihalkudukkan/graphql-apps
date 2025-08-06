package com.example.graphql_be.controllers;

import com.example.graphql_be.models.Car;
import com.example.graphql_be.models.Employee;
import com.example.graphql_be.models.exceptions.CarNotFoundException;
import com.example.graphql_be.models.exceptions.EmployeeNotFoundException;
import com.example.graphql_be.models.requests.CarInput;
import com.example.graphql_be.models.requests.EmployeeInput;
import com.example.graphql_be.repositories.CarRepository;
import com.example.graphql_be.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class GraphController {
    private EmployeeRepository employeeRepository;
    private CarRepository carRepository;

    @QueryMapping
    public List<Employee> allEmployees(@Argument Integer pageNumber,@Argument Integer size) {
        if (size==0) {
            return employeeRepository.findAll();
        }
        Pageable pageable = PageRequest.of(pageNumber, size);
        Page<Employee> pageableEmployees = employeeRepository.findAll(pageable);
        return pageableEmployees.getContent();
    }

    @QueryMapping
    public Employee employeeById(@Argument int id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Car> findAllCars(@Argument Integer pageNumber,@Argument Integer size) {
        if (size==0) {
            return carRepository.findAll();
        }
        Pageable pageable = PageRequest.of(pageNumber, size);
        Page<Car> pageableCars = carRepository.findAll(pageable);
        return pageableCars.getContent();
    }

    @QueryMapping
    public Car findCarById(@Argument int id) {
        return carRepository.findById(id).orElseThrow(()->new CarNotFoundException("Car not found"));
    }

    @MutationMapping
    public Employee createEmployee(@Argument EmployeeInput input) {
        Employee employee = new Employee();
        employee.setFirstName(input.firstName());
        employee.setLastName(input.lastName());
        employee.setJob(input.job());
        employee.setJoinDate(input.joinDate());

        return employeeRepository.save(employee);
    }

    @MutationMapping
    public Car createCar(@Argument CarInput input) {
        Employee owner = employeeRepository.findById(input.employeeId())
                .orElseThrow(() -> new EmployeeNotFoundException("Invalid employee ID: " + input.employeeId()));
        Car car = new Car(0, input.brand(), input.model(), input.color(), owner);

        return carRepository.save(car);
    }
}
