package com.mrheer.filedistributorservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "host_table")
public class HostEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    Long id;

    @Column(name = "group_name", nullable = false)
    String groupName;

    @Column(name = "host_name", nullable = false)
    String hostName;

    @Column(name = "ip_address", nullable = false)
    String ipAddress;

    @Column(name = "user_name", nullable = false)
    String userName;

    @Column(name = "password", nullable = false)
    String password;
}
