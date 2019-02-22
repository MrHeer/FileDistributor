package com.mrheer.filedistributorservice.repository;

import com.mrheer.filedistributorservice.entity.HostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<HostEntity, Long> {

}
