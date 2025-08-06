package com.example.graphql_be.models.requests;

import java.time.LocalDate;
public record EmployeeInput(String firstName,
                            String lastName,
                            String job,
                            LocalDate joinDate)
{}
