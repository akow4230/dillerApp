package com.example.backend.Entity;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Entity
    @Builder
    @Table(name = "company")
    public class Company {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private String region;
        private String name;
        @ManyToOne
        private User owner;
        private String supportPhone;
        private String email;
        private String address;
    }
