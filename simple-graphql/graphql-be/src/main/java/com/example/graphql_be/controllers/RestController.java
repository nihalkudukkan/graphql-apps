package com.example.graphql_be.controllers;

import com.example.graphql_be.models.Employee;
import com.example.graphql_be.repositories.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@AllArgsConstructor
public class RestController {
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllCars() {
        return employeeRepository.findAll();
    }

    @PostMapping("/employee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepository.saveAndFlush(employee);
    }

    @GetMapping("/employee/{id}")
    public Object findEmployeeById(@PathVariable int id) {
        return employeeRepository.findById(id).orElse(null);
    }
}
