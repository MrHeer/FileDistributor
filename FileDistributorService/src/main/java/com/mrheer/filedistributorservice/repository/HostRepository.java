package com.mrheer.filedistributorservice.repository;

import com.mrheer.filedistributorservice.entity.HostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HostRepository extends JpaRepository<HostEntity, Long> {
    List<HostEntity> findAll();
}
